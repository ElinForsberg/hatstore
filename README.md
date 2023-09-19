# Hatstore

# Hatstore är byggt med node /express i backend och react i frontend
# För att få igång projektet görs en npm install i server mappen och en npm install i client mappen
# För att starta servrarna körs npm run dev i respektive mapp (clent och server)
# Api nyckel till stripe är sparad i en .env fil. denna finns ej på github. för att projektet ska fungera måste en .env fil skapas och nyckel måste skrivas i där. Skickas separat.
# Server ligger på localhost:3000
# Client ligger på localhost:5173
# Hatstore är en webbutik där stripe används. Produkterna finns i stripe och hämtas därifrån.
# Betalning sker via stripe, när en betalning är gjord kommer kunden tillbaka till hatstore.
# För att göta en betalning måste kunden vara inloggad.
# När en kund skapas sparas den både i stripe och i en json fil i server mappen
# När en order är lagd hämtas den till server och sparas i en json fil
# En inloggad kund kan se sina tidigare ordrar
