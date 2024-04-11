import app from './src/app'

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});