export function Currency(input: number) {
  const value = input + "";
  const len = value.length;
  if (len < 4) {
    return value;
  }
  const separator = ",";
  const counter = 3;
  const arrayLen = Math.ceil(len / counter);
  const newData = new Array(arrayLen);
  const diffLen = arrayLen * counter - len;
  let pointer = 0;
  let starter = 0;
  while (arrayLen > pointer) {
    const index = pointer;
    if (index === 0) {
      starter = diffLen === 0 ? counter : counter - diffLen;
      newData[index] = value.substring(0, starter);
    } else {
      newData[index] = value.substring(starter, starter + counter);
      starter = starter + counter;
    }
    ++pointer;
  }
  // let newValue = newData.join(separator);
  // newValue=newValue.replace("1","")
  return newData.join(separator);
}
