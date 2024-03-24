<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý Sách</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'book' }" class="nav-link">
                    Sách
                    <i class="fa-solid fa-book"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>