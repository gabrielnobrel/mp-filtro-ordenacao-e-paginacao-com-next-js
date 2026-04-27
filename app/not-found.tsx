import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Página não encontrada</CardTitle>
          <CardDescription>
            A página que você está procurando não existe ou foi removida.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-7">
          <Link href="/" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">
            Voltar para a lista de pedidos
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
