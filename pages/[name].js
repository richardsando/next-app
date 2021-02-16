import { useRouter } from "next/router";

const Name = () => {
  const router = useRouter();
  const { name } = router.query;
  console.log(name);
  return <h1>Welcome {name}!</h1>;
};

export default Name;
