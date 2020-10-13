// 日付フォーマットを"-"から"/"に変更するメソッド
export const displayDateFormat = (date) => {
  return date.replace(/-/g, "/");
};

// 日付をurlのクエリパラメータに設定する際のフォーマットに変換するメソッド
export const queryParamDateFormat = (year, month) => {
  const queryParamDate = year + "-" + month;
  return queryParamDate;
};

// 現在日付（年）を取得
export const displayCurrentYear = () => {
  const year = new Date().getFullYear();
  return year;
};

// 現在日付（月）を取得
export const displayCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  return month;
};

// 3桁区切り
export const displayIntegerFormat = (value) => {
  return value != null ? value.toLocaleString() : false;
};
