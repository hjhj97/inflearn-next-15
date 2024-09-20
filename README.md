## Next.js App Router

### Prefetch

- `<Link>` 컴포넌트로 불러오는 페이지들은 자동적으로 prefetch 된다. 비활성화 하기 위해서는 `<Link prefetch={false} />` 로 지정한다.
- `router.push()` 함수와 같이 프로그래매틱한 페이지들은 prefetch 되지 않는다. 이를 활성화 하기 위해서는 아래와 같이 `router.prefetch()` 로 지정해야 한다.
  ```
  router.prefetch('/page')
  ```

### Styling

- Next.js 에서 일반 css 파일을 App 파일을 제외한 다른 곳에서 import 불가
- 따라서 App 파일이 아닌 곳에서 import 하기 위해서는 css 파일 이름을 `.module.css` 형태로 바꾸고, 해당 파일에서

```
 import style from "~.module.css"
```

와 같이 import 하면 css 파일에 작성한 속성이 `style` Object 형태로 변환됨

### SSR

```tsx
export const getServerSideProps = () => {
  // 서버사이드에서 실행
  const data = "hello";
  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }) {
  // 서버사이드와 클라이언트사이드에서 각각 실행
}
```
