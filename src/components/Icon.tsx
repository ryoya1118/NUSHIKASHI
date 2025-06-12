import React from 'react';
import { iconMap, type IconName } from '~config/icons';

// propsの型定義は、refを含まない形でOK
interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  name: IconName;
}

// React.forwardRef を使ってコンポーネントを定義します
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, ...props }, ref) => {
    // name に基づいて iconMap から適切なコンポーネントを取得
    const IconComponent = iconMap[name];

    // もし対応するアイコンがなければ何も表示しない
    if (!IconComponent) {
      // 開発モードのときだけコンソールに警告を出すとデバッグに便利です
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Icon Component] Icon with name "${name}" not found.`);
      }
      return null;
    }

    // IconComponentにpropsを渡し、第2引数で受け取ったrefをそのまま渡します
    return <IconComponent {...props} ref={ref} />;
  }
);

// React DevToolsなどでコンポーネント名が正しく表示されるようにdisplayNameを設定します
Icon.displayName = 'Icon';