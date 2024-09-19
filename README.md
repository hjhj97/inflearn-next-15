## Next.js App Router

### Prefetch

- `<Link>` 컴포넌트로 불러오는 페이지들은 자동적으로 prefetch 된다. 비활성화 하기 위해서는 `<Link prefetch={false} />` 로 지정한다.
- `router.push()` 함수와 같이 프로그래매틱한 페이지들은 prefetch 되지 않는다. 이를 활성화 하기 위해서는 아래와 같이 `router.prefetch()` 로 지정해야 한다.
  ```
  router.prefetch('/page')
  ```
