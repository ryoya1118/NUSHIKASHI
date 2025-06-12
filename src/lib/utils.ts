export function hexToRgba(hex: string, alpha: number): string {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    return `rgba(128, 128, 128, ${alpha})`
  }
  let c = hex.substring(1).split("")
  if (c.length === 3) {
    c = [c[0], c[0], c[1], c[1], c[2], c[2]]
  }
  const r = parseInt("0x" + c[0] + c[1])
  const g = parseInt("0x" + c[2] + c[3])
  const b = parseInt("0x" + c[4] + c[5])
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
