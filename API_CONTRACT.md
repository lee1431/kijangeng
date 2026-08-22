# KIJ API 계약 초안

기본 URL: `https://mrdindoin.ddns.net/kij`

관리자 쓰기 요청은 `Authorization: Bearer <token>` 헤더를 사용한다. 공개 GET 요청은 인증 없이 허용한다. `https://kijeng.co.kr` 출처에 CORS를 허용해야 한다.

| Method | Path | 설명 |
|---|---|---|
| POST | `/auth/login` | `{ username, password }` → `{ token }` |
| GET/POST | `/notices` | 공지 목록/생성 |
| PUT/DELETE | `/notices/:id` | 공지 수정/삭제 |
| GET/PUT | `/organization` | 조직도 조회/교체 (`multipart/form-data`) |
| GET/POST | `/performances` | 실적 목록/생성 (`multipart/form-data`) |
| PUT/DELETE | `/performances/:id` | 실적 수정/삭제 |

공지: `id, title, content, date, published`  
조직도: `imageUrl, alt, updatedAt`  
실적: `id, category, year, title, imageUrl, sortOrder`

카테고리 값은 `endd`, `tab`, `machine`, `tunnel`을 사용한다.
