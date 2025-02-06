import { MainTitle } from "../atoms/text";
import { PrimaryButton, SecondaryButton } from "../atoms/buttons";
import { IconCarrousel } from "@/components/iconCarousel";
import Link from "next/link";
import { createClient } from "../../utils/supabase/server";

export default function Home() {
  return (
    <main className="items-center flex min-h-screen justify-center bg-dark-bg text-light-text">
      <div>
        <div className="flex items-baseline mt-2 gap-2">
          <MainTitle> ApolloArt </MainTitle>
          <IconCarrousel />
        </div>
        <div>
          <h2>Seu lugar pra comentar sobre sua arte favorita </h2>
        </div>
        <div className="space-x-5">
          <Link href="/login">
            <PrimaryButton> Entrar </PrimaryButton>
          </Link>
          <SecondaryButton>
            <Link href="/register">Cadastrar-se</Link>
          </SecondaryButton>
        </div>
      </div>
    </main>
  );
}
