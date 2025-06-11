// 최근 검색어 부분

// 각 scope (films, gallery, talk) 에 따라 고유한 localStorage 키 생성
function getStorageKey(scope: string) {
  return `recent_searches_${scope}`;
}

// 최근 검색어 목록
export function getRecentSearches(scope: string): string[] {
  const raw = localStorage.getItem(getStorageKey(scope));
  return raw ? JSON.parse(raw) : [];
}

// 새로운 검색어 최근 검색어 목록에 추가
// 중복된 키워드는 제거, 최신 검색어 맨 앞에 추가
// 최대 10개까지만 저장
export function addRecentSearch(scope: string, keyword: string) {
  const recent = getRecentSearches(scope);
  const updated = [keyword, ...recent.filter((k) => k !== keyword)].slice(
    0,
    10
  );
  localStorage.setItem(getStorageKey(scope), JSON.stringify(updated));
}

// 검색어 1개 삭제
export function removeRecentSearch(scope: string, keyword: string) {
  const updated = getRecentSearches(scope).filter((k) => k !== keyword);
  localStorage.setItem(getStorageKey(scope), JSON.stringify(updated));
}

// 해당 scope의 전체 검색어 삭제
export function clearRecentSearches(scope: string) {
  localStorage.removeItem(getStorageKey(scope));
}
