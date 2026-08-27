// 类型守卫：判断值是否可视为有效搜索词
export function isValidSearchInput(value: unknown): value is string {
  // 1. 排除 null / undefined
  if (value == null) return false;

  // 2. 确保是字符串
  if (typeof value !== 'string') return false;

  // 3. 去除首尾空格后的实际内容
  const trimmed = value.trim();

  // 4. 去除空格后为空字符串 → 无效
  if (trimmed.length === 0) return false;

  // 5. 去除空格后等于 "0" → 无效（可按需调整）
  if (trimmed === '0') return false;

  // 6. （可选）长度限制（例如 1~100 个字符）
  if (trimmed.length > 100) return false;

  // 7. （可选）纯特殊字符校验，例如：只包含标点且无字母数字
  //    这里用正则检查是否至少包含一个字母或数字（业务自定义）
  //    如果你的业务允许特殊符号搜索（如搜索 "?!"），则移除该条
  //    const hasAlnum = /[a-zA-Z0-9]/.test(trimmed);
  //    if (!hasAlnum) return false;

  // 8. （可选）黑名单字符（如 < > & 等，用于防 XSS）
  //    注意：此处仅为前端提示，后端仍需严格过滤
  //    if (/[<>]/.test(trimmed)) return false;

  return true;
}

