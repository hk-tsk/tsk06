export function ReplaceAll(
  text: string,
  SearchValue: string,
  replaceSymbole: string
) {
  const reg = new RegExp(SearchValue, "gi");
  return text.replace(reg, replaceSymbole);
}

export function ApplyLineStyle(text: string) {
  return ReplaceAll(text, "  ", "&nbsp;&nbsp;");
}

export function ClearText(value: string) {
  let newValue = ReplaceAll(value, '"', "''");
  newValue = ReplaceAll(value, "<script>", "s_c_r_i_p_t");
  newValue = ReplaceAll(newValue, "</script>", "/s_c_r_i_p_t");
  newValue = ReplaceAll(newValue, "eval", "e_v_a_l");
  newValue = ReplaceAll(newValue, ">", ">>");
  newValue = ReplaceAll(newValue, "<", "<<");
  return newValue;
}
