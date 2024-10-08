## 1. Setting

```bash
# Install package
yarn install

# Run dev server
yarn dev

# Build project
yarn build
```

## 2. Branch Convention

ex) feat/login-ui

- feat: 기능 개발
- refactor: 코드 리팩토링
- hotfix: 배포 버전 버그 수정

## 3. 폴더구조

```
src/
├── apis // api 호출 함수 관리
├── assets // 각종 이미지 파일 관리
├── components // 컴포넌트 관리
│   ├── common // 기본 컴포넌트
│   └── login
│       ...
├── constant // 상수 관리
├── hooks // custom hook 관리
├── pages
│   └── main
│       ...
├── store // 전역 상태 관리
├── type // 공유 타입 관리
├── utils // 각종 유틸 함수 관리
├── App.tsx // routing 처리
├── index.css // 전역 css 관리
└── main.tsx
```

## 4. Commit Convention

- feat: 새로운 기능 추가
- fix: 버그 및 오류 수정
- style: css 파일 위주의 ui 작업
- docs: 문서 수정
- refactor: 코드 리팩토링
- chore: 빌드수행, 패키지 설치, 환경 설정 수정 등
