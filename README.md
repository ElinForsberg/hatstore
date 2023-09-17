# hatstore

# hatstore är byggt med node /express i backend och react i frontend
# för att få igång projektet görs en npm install i server mappen och en npm install i client mappen
# för att starta servrarna körs npm run dev i respektive mapp (clent och server)
# api nyckel till stripe är sparad i en .env fil. denna finns ej på github. för att projektet ska fungera måste en .env fil skapas och nyckel måste skrivas i där. Skickas separat.
# server ligger på localhost:3000
# client ligger på localhost:5173
# hatstore är en webbutik där stripe används. Produkterna finns i stripe och hämtas därifrån.
# betalning sker via stripe, när en betalning är gjord kommer kunden tillbaka till hatstore
# när en kund skapas sparas den både i stripe och i en json fil i server mappen
# när en order är lagd hämtas den till server och sparas i en json fil
# en inloggad kund kan se sina tidigare ordrar
