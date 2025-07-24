import { useEffect, useState } from "react";
import userCount from "../../services/useUserCount";

type SimpleNumberStatProps = {
  title: string;
  options?: string;
};

function SimpleNumberStat({ title, options }: SimpleNumberStatProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const countUser = async () => {
      const result = await userCount(options);
      setCount(result);
    };
    countUser();
  }, [options]);

  return (
    <>
      <p className="text-player">{title}</p>
      <p className="text-player">{count !== null ? count : "Chargement..."}</p>
    </>
  );
}

export default SimpleNumberStat;
