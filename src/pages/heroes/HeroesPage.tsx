import { Navigate, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { getHeroById } from "@/App/actions/get-heroes-by-page.action"
import { Badge } from "@/components/ui/badge"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Zap, Brain, Gauge, Users, Star, Award } from "lucide-react"

const HeroesPage = () => {
  const { idSlug = "" } = useParams() //Recolectamos el parametro de la URL

  const { data, isError } = useQuery({
    //Hacemos una petición useQuery a la función de getHeroById
    queryKey: [`${idSlug}`],
    queryFn: () => getHeroById(idSlug),
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  if (isError) {
    return <Navigate to={"/"} />
  }

  if (!data) {
    return <div>Cargando...</div>
  }

  const totalPower =
    data?.strength + data?.intelligence + data?.speed + data?.durability
  const averagePower = Math.round((totalPower / 4) * 10)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Inactive":
        return "bg-gray-500"
      case "Retirado":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Hero":
        return "bg-blue-500"
      case "villano":
        return "bg-red-500"
      case "antihéroe":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="relative">
              <img
                src={data?.image || "/placeholder.svg"}
                alt={data?.alias}
                width={200}
                height={200}
                className="rounded-full border-4 border-white/20 shadow-2xl"
              />
              <div className="absolute -top-2 -right-2">
                <div className="rounded-full bg-yellow-400 p-2 text-black">
                  <Star className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
                <Badge
                  className={`${getCategoryColor(String(data?.category))} text-white`}
                >
                  {data?.category}
                </Badge>
                <Badge
                  className={`${getStatusColor(String(data?.status))} text-white`}
                >
                  {data?.status}
                </Badge>
                <Badge
                  variant="secondary"
                  className="border-white/30 bg-white/20 text-white"
                >
                  {data?.universe}
                </Badge>
              </div>

              <h1 className="mb-2 text-4xl font-bold md:text-6xl">
                {data?.alias}
              </h1>
              <p className="mb-4 text-xl text-blue-200">{data?.name}</p>
              <p className="max-w-2xl text-lg text-gray-300">
                {data?.description}
              </p>
            </div>

            <div className="text-center">
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400">
                  {averagePower}%
                </div>
                <div className="text-sm text-gray-300">Nivel de Poder</div>
                <div className="mt-2 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(averagePower / 20) ? "fill-current text-yellow-400" : "text-gray-400"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-4">
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Estadísticas
            </TabsTrigger>
            <TabsTrigger value="powers" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Poderes
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Equipo
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Información
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Strength */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-red-100 p-3">
                      <Zap className="h-8 w-8 text-red-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Fuerza</h3>
                  <div className="mb-2 text-3xl font-bold text-red-600">
                    {data?.strength}
                  </div>
                  <Progress value={data?.strength * 10} className="h-2" />
                </CardContent>
              </Card>

              {/* Intelligence */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-purple-100 p-3">
                      <Brain className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Inteligencia</h3>
                  <div className="mb-2 text-3xl font-bold text-purple-600">
                    {data?.intelligence}
                  </div>
                  <Progress value={data?.intelligence * 10} className="h-2" />
                </CardContent>
              </Card>

              {/* Speed */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-yellow-100 p-3">
                      <Gauge className="h-8 w-8 text-yellow-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Velocidad</h3>
                  <div className="mb-2 text-3xl font-bold text-yellow-600">
                    {data?.speed}
                  </div>
                  <Progress value={data?.speed * 10} className="h-2" />
                </CardContent>
              </Card>

              {/* Durability */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-green-100 p-3">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Resistencia</h3>
                  <div className="mb-2 text-3xl font-bold text-green-600">
                    {data?.durability}
                  </div>
                  <Progress value={data?.durability * 10} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Power Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Comparación de Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">Fuerza</div>
                    <div className="flex-1">
                      <Progress value={data?.strength * 10} className="h-4" />
                    </div>
                    <div className="w-12 text-right font-bold">
                      {data?.strength}/10
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">Inteligencia</div>
                    <div className="flex-1">
                      <Progress
                        value={data?.intelligence * 10}
                        className="h-4"
                      />
                    </div>
                    <div className="w-12 text-right font-bold">
                      {data?.intelligence}/10
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">Velocidad</div>
                    <div className="flex-1">
                      <Progress value={data?.speed * 10} className="h-4" />
                    </div>
                    <div className="w-12 text-right font-bold">
                      {data?.speed}/10
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">Resistencia</div>
                    <div className="flex-1">
                      <Progress value={data?.durability * 10} className="h-4" />
                    </div>
                    <div className="w-12 text-right font-bold">
                      {data?.durability}/10
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="powers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  Superpoderes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data?.powers.map((power, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-500 p-2">
                          <Zap className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-blue-900">
                          {power}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-green-500" />
                  Afiliación de Equipo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 p-6">
                    <Users className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-green-700">
                    {data?.team}
                  </h3>
                  <p className="text-gray-600">
                    Miembro activo del equipo de superhéroes más poderoso
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Detalles Personales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border-b py-2">
                    <span className="text-gray-600">Nombre Real:</span>
                    <span className="font-semibold">{data?.name}</span>
                  </div>
                  <div className="flex items-center justify-between border-b py-2">
                    <span className="text-gray-600">Alias:</span>
                    <span className="font-semibold">{data?.alias}</span>
                  </div>
                  <div className="flex items-center justify-between border-b py-2">
                    <span className="text-gray-600">Categoría:</span>
                    <Badge
                      className={`${getCategoryColor(data?.category)} text-white`}
                    >
                      {data?.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Estado:</span>
                    <Badge
                      className={`${getStatusColor(data?.status)} text-white`}
                    >
                      {data?.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información del Universo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border-b py-2">
                    <span className="text-gray-600">Universo:</span>
                    <span className="font-semibold">{data?.universe}</span>
                  </div>
                  <div className="flex items-center justify-between border-b py-2">
                    <span className="text-gray-600">Primera Aparición:</span>
                    <span className="font-semibold">
                      {data?.firstAppearance}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Años Activo:</span>
                    <span className="font-semibold">
                      {new Date().getFullYear() -
                        Number.parseInt(data?.firstAppearance)}{" "}
                      años
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default HeroesPage
