# DaehyunY00.github.io

Hugo 기반 기술 블로그입니다.  
GitHub Pages User Page(`https://daehyuny00.github.io/`)로 배포되도록 설계했습니다.

## 1. 로컬 실행 방법

### 사전 준비

- Hugo Extended 최신 안정 버전 설치
- Git 설치

macOS(Homebrew) 예시:

```bash
brew install hugo
hugo version
```

### 개발 서버 실행

```bash
hugo server -D
```

- 기본 접속 주소: `http://localhost:1313`
- `-D` 옵션은 draft 문서까지 포함해 미리보기

### 프로덕션 빌드

```bash
hugo --gc --minify
```

빌드 결과물은 `public/`에 생성됩니다.

## 2. 새 글 작성 방법

### 일반 기술 글 (posts)

```bash
hugo new content posts/my-post.md
```

### 논문 리뷰 (papers archetype)

```bash
hugo new content papers/my-paper-review.md --kind papers
```

### 기업 기술 블로그 분석 (techblogs archetype)

```bash
hugo new content techblogs/my-techblog-analysis.md --kind techblogs
```

### 기술 분석 글 (technology)

```bash
hugo new content technology/my-technology-note.md
```

## 3. 배포 구조

워크플로 파일: `.github/workflows/hugo-pages.yml`

- `pull_request -> main`
  - front matter 필수 필드 검사
  - 내부 링크 깨짐 검사
  - Hugo 빌드 검증
- `push -> main`
  - 동일 품질 검사 + Hugo 빌드
  - GitHub Pages 공식 액션(`upload-pages-artifact`, `deploy-pages`)으로 배포

권한은 기본 `contents: read`, 배포 잡에서만 `pages: write`, `id-token: write`를 사용합니다.

## 4. 디렉토리 구조

```text
.
├── archetypes/
│   ├── default.md
│   ├── papers.md
│   └── techblogs.md
├── config/_default/
│   ├── hugo.toml
│   ├── params.toml
│   ├── menus.ko.toml
│   └── menus.en.toml
├── content/
│   ├── posts/
│   ├── papers/
│   ├── technology/
│   ├── techblogs/
│   └── about/
├── scripts/
│   ├── validate_front_matter.py
│   └── check_internal_links.py
└── themes/lab-light/
```

## 5. baseURL / 도메인 운영 가이드

- 현재 `config/_default/hugo.toml`의 `baseURL`은 User Page 기준:
  - `https://daehyuny00.github.io/`
- 커스텀 도메인 전환 시:
  1. `baseURL`을 커스텀 도메인으로 변경
  2. `static/CNAME` 파일 추가(도메인 문자열 1줄)
  3. GitHub Pages 설정에서 Custom domain 활성화

이 순서로 적용하면 canonical/SEO 메타 충돌을 줄일 수 있습니다.

## 6. 향후 확장 방법

- `content/<section>/` 추가 + `themes/lab-light/layouts/<section>/` 템플릿 추가
- 다국어 확장 시 `<name>.en.md` 파일로 점진 도입
- 댓글/검색이 필요하면 외부 서비스(예: Giscus, Pagefind)만 부분적으로 연결
- CI 검사 강화를 원하면 `markdownlint`, `lychee` 등 도입
