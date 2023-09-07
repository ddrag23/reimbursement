<h2 align="center">REIMBURSEMENT</h2>

## Cara Install

- Clone Repository ini ke lokal komputer anda:
<br/>
`git clone git@github.com:ddrag23/reimbursement.git`
-  masuk ke direktori atau folder projek yang sudah diclone
-  copy .env.example menjadi .env
-  lakukan installasi library laravel:
<br>
`composer install`
- kemudian generate laravel key
<br>
`php artisan key:generate`
- kemudian lakukan installasi library javascript
<br>
`npm install`
- setelah selesai buat database yang ada dilokal anda
- Kemudian lakukan migration untuk generate struktur tabel yang sudah ada difolder migration
<br>
`php artisan migrate`
- setelah selesai migrasi tabel kemudian jalankan seeder data untuk membuat inisialisasi data
<br>
`php artisan db:seed`

## Github Link
[https://github.com/ddrag23/reimbursement](https://github.com/ddrag23/reimbursement)

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
