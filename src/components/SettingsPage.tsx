import React, { useState, Fragment, useEffect } from "react"
import { Popover, Transition } from '@headlessui/react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useSettings } from "~contexts/SettingsContext"
import type { CategorySetting, ThemeSettings } from "~types/settings"
import { Icon } from "~components/Icon"
import { iconNames, type IconName } from "~config/icons"
import { categoryColors } from "~config/defaultSettings"

const SortableCategoryItem = ({ id, category, onUpdate, onDelete }: { id: string; category: CategorySetting; onUpdate: (id: string, field: keyof CategorySetting, value: string | IconName) => void; onDelete: (id: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm dark:shadow-none touch-none">
      <div className="flex items-center space-x-4">
        <div {...listeners} className="p-1 cursor-grab active:cursor-grabbing text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
        </div>
        <Popover className="relative">
          <Popover.Button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
            <Icon name={category.iconName} className="w-6 h-6" style={{ color: category.color }}/>
          </Popover.Button>
          <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
            <Popover.Panel className="absolute z-20 mt-2 w-64 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 grid grid-cols-6 gap-1">
              {({ close }) => (
                <>
                  {iconNames.map(name => (
                    <button key={name} onClick={() => { onUpdate(id, 'iconName', name); close(); }} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
                      <Icon name={name} className="w-6 h-6 text-gray-500 dark:text-gray-300"/>
                    </button>
                  ))}
                </>
              )}
            </Popover.Panel>
          </Transition>
        </Popover>
        <Popover className="relative">
          <Popover.Button className="w-5 h-5 rounded-md flex-shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-indigo-500" style={{ backgroundColor: category.color }} />
          <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
            <Popover.Panel className="absolute z-20 mt-2 w-52 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 grid grid-cols-6 gap-2">
              {({ close }) => (
                <>
                  {categoryColors.map(color => (
                    <button
                      key={color}
                      onClick={() => { onUpdate(id, 'color', color); close(); }}
                      className="w-7 h-7 rounded-md hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-indigo-500"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </>
              )}
            </Popover.Panel>
          </Transition>
        </Popover>
        <input type="text" value={category.name} onChange={(e) => onUpdate(id, "name", e.target.value)} className="flex-grow block w-full sm:text-sm rounded-md p-2 shadow-sm bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500" placeholder="カテゴリ名"/>
        <button onClick={() => onDelete(id)} className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  )
}

function SettingsPage() {
  const { settings, setSettings } = useSettings()
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))

  useEffect(() => {
    const root = window.document.documentElement
    const isDark = settings.theme.mode === 'dark'
    const isSystem = settings.theme.mode === 'system'

    root.classList.remove('light', 'dark')

    if (isDark || (isSystem && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark')
    } else {
      root.classList.add('light')
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (settings.theme.mode === 'system') {
        if (e.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings.theme.mode])

  const handleThemeChange = (mode: ThemeSettings['mode']) => {
    setSettings({ theme: { ...settings.theme, mode } })
  }

  const handleCategoryChange = (id: string, field: keyof CategorySetting, value: string | IconName) => {
    const newCategories = settings.categories.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat))
    setSettings({ categories: newCategories })
  }

  const handleAddCategory = () => {
    const newCategory: CategorySetting = { id: `cat_${Date.now()}`, name: "新しいカテゴリ", color: "#a1a1aa", iconName: 'tag', keywords: [], type: "variable" }
    setSettings({ categories: [...settings.categories, newCategory] })
  }

  const handleDeleteCategory = (id: string) => {
    if (settings.categories.length <= 1) return
    const newCategories = settings.categories.filter((cat) => cat.id !== id)
    setSettings({ categories: newCategories })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event
    if (over && active.id !== over.id) {
      const oldIndex = settings.categories.findIndex(c => c.id === active.id)
      const newIndex = settings.categories.findIndex(c => c.id === over.id)
      setSettings({ categories: arrayMove(settings.categories, oldIndex, newIndex) })
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 font-sans bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">設定</h1>

      <div className="space-y-8">
        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
          <h2 className="px-2 font-semibold text-lg text-slate-600 dark:text-slate-300 mb-4">表示テーマ</h2>
          <div className="flex space-x-2 rounded-lg bg-slate-200 dark:bg-slate-800 p-1">
            {[
              { mode: 'light', label: 'ライト', icon: 'sun' as IconName },
              { mode: 'dark', label: 'ダーク', icon: 'moon' as IconName },
              { mode: 'system', label: 'システム', icon: 'computer' as IconName }
            ].map(({ mode, label, icon }) => (
              <button key={mode} onClick={() => handleThemeChange(mode as ThemeSettings['mode'])} className={`w-full flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${settings.theme.mode === mode ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-700/50"}`}>
                <Icon name={icon} className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
          <h2 className="px-2 font-semibold text-lg text-slate-600 dark:text-slate-300 mb-4">カテゴリ設定</h2>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={settings.categories} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {settings.categories.map(cat => <SortableCategoryItem key={cat.id} id={cat.id} category={cat} onUpdate={handleCategoryChange} onDelete={handleDeleteCategory} /> )}
              </div>
            </SortableContext>
          </DndContext>
          <button onClick={handleAddCategory} className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            カテゴリを追加
          </button>
        </div>
      </div>
    </div>
  )
}
export default SettingsPage