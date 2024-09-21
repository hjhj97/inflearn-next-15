## Next.js App Router

[한 입 크기로 잘라먹는 Next.js](https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%ED%81%AC%EA%B8%B0-nextjs)

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

- 클라이언트가 페이지를 요청할 때마다 서버 로직이 실행되어 페이지를 렌더링함

```tsx
export const getServerSideProps = () => {
  // 서버사이드에서 실행, 클라이언트가 요청할 때마다 실행
  const data = "hello";
  return {
    props: {
      data,
    },
  };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // 서버사이드와 클라이언트사이드에서 각각 실행
}
```

### SSG

- 빌드타임에 미리 페이지를 렌더링해놓고, 클라이언트가 요청하면 렌더링된 파일을 먼저 보냄
- 검색 페이지처럼 어떤 컨텐츠가 담길지 예측할 수 없는 페이지는 SSG로 불가능, CSR로 대체해야함

```tsx
export const getStaticProps = () => {
  // 서버사이드에서 실행, 빌드타임 때 단 1번만 실행됨
  const data = "hello";
  return {
    props: {
      data,
    },
  };
};

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // 서버사이드와 클라이언트사이드에서 각각 실행
}
```

- dynamic path를 가질 경우, `getStaticPaths` 함수에서 어떤 종류의 경로를 가지는지 명시해줘야함.

```tsx
export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false,
  };
};
```

#### fallback 옵션

- `false` : 즉시 에러(404) 반환
- `"blocking"` : 즉시 페이지 생성(SSR)
- `true` : 즉시 페이지 생성 + 임시로 페이지 보내줌

### ISR

```tsx
export const getStaticProps = async () => {
  const [allBooks, recommendedBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recommendedBooks,
    },
    revalidate: 3, // 3초 주기로 재생성 -> ISR
  };
};
```

#### On-demand ISR

- 시간 경과에 따라 페이지를 재생성 하는 방식 대신, 요청에 따라서 능동적으로 페이지를 재생성 가능
- api route 에서 `res.reavalidate(path)` 호출

```tsx
// api/revalidate.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (error) {
    res.status(500).send("Revalidation Failed");
  }
}
```

### SEO 설정

- `Head` 컴포넌트를 통해 설정 가능

```tsx
<Head>
  <title>한입북스</title>
  <meta property="og:image" content="/thumbnail.png" />
  <meta property="og:title" content="한입북스" />
  <meta property="og:description" content="한입북스 입니다" />
</Head>
```
