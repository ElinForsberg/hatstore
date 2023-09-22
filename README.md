# Hatstore

# Hatstore är byggt med node /express i backend och react i frontend
# För att få igång projektet görs en npm install i server mappen och en npm install i client mappen
# För att starta servrarna körs npm run dev i respektive mapp (client och server)
# Api nyckel till stripe är sparad i en .env fil. denna finns ej på github. för att projektet ska fungera måste en .env fil skapas och nyckel måste skrivas i där. Skickas separat.
# Server ligger på localhost:3000
# Client ligger på localhost:5173
# Hatstore är en webbutik där Stripe används som betallösning. Produkterna finns i Stripe och hämtas därifrån. Dessa produkter listas på en sida.
# Produkterna går att lägga till i en kundvagn. Från kundvagnen kan man gå till Stripe för att lägga en order. Det är bara inloggade användare som kan lägga en order.
# Betalning sker via Stripe, när en betalning är gjord kommer kunden tillbaka till Hatstore
# För att göta en betalning måste kunden vara inloggad
# Rabbattkod "FALL23" kan användas i Stripe för att få 20% rabatt på köpet
# När en kund skapas sparas den både i Stripe och i en json fil i server mappen. I json sparas användarnamn, email, id från stripe samt lösenordet som är hashat.
# När en order är lagd och betalning är bekräftad att den gått igenom hämtas den till server och sparas i en json fil
# En inloggad kund kan se sina tidigare ordrar

# Länk till github repo: https://github.com/ElinForsberg/hatstore
