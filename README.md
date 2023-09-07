<h2 align="center">REIMBURSEMENT</h2>

## Cara Install

- Clone Repository ini ke lokal komputer anda:

```sh
git clone git@github.com:ddrag23/reimbursement.git
```
-  masuk ke direktori atau folder projek yang sudah diclone
-  copy .env.example menjadi .env
-  ubah value dari env variable FILESYSTEM_DISK sesuai dengan kebutuhan anda. disini author memakai public
-  Lakukan symlink agar file yang sudah kita upload bisa dibuka
```sh
php artisan:storage link
```
-  lakukan installasi library laravel:
```sh
composer install
```
- kemudian generate laravel key
```sh 
php artisan key:generate
```
- kemudian lakukan installasi library javascript
```sh
npm install
```
- setelah selesai buat database yang ada dilokal anda
- Kemudian lakukan migration untuk generate struktur tabel yang sudah ada difolder migration
```sh
php artisan migrate
```
- setelah selesai migrasi tabel kemudian jalankan seeder data untuk membuat inisialisasi data
```sh
php artisan db:seed
```
- Setelah semua proses sudah dilakukan buka 2 terminal dari kode editor anda atau external
terminal yang anda miliki kemudian jalankan kode berikut :
```sh
php artisan serve
``` 

```sh
npm run dev
``` 

## Github Link
[https://github.com/ddrag23/reimbursement](https://github.com/ddrag23/reimbursement)

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
