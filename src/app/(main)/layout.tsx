import { BsHouse } from "react-icons/bs";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="bg-dark-bg h-screen">
        <div className="pt-5 gap-5 flex justify-center">
          <BsHouse size={40} className="text-white" />
          <input
            type="text"
            className="w-1/2 rounded-xl px-5"
            placeholder="Search an user!"
          />
        </div>
        {children}
      </main>
    </>
  );
}
