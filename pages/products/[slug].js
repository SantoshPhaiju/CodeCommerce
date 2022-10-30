import { useRouter } from "next/router";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <p>Product: {slug}</p>;
};

export default Slug;
