<template>
  <footer>
    <div class="footer-container">
      <!-- Logo + Descriere -->
      <div>
        <h2 class="footer-logo">CodeLearn</h2>
        <p class="footer-desc">
          Platformă interactivă pentru a învăța informatică online — de la
          bazele programării până la concepte avansate.
        </p>
      </div>

      <!-- Cursuri -->
      <div>
        <h3 class="footer-title">Cursuri</h3>
        <ul class="footer-list">
          <li><a href="#">Introducere în C++</a></li>
          <li><a href="#">Programare Java</a></li>
          <li><a href="#">HTML & CSS</a></li>
          <li><a href="#">Algoritmi și structuri de date</a></li>
        </ul>
      </div>

      <!-- Linkuri utile -->
      <div>
        <h3 class="footer-title">Resurse</h3>
        <ul class="footer-list">
          <li><a href="#">Blog</a></li>
          <li><a href="#">Întrebări frecvente</a></li>
          <li><a href="#">Termeni și condiții</a></li>
          <li><a href="#">Politica de confidențialitate</a></li>
        </ul>
      </div>

      <!-- Contact / Social -->
      <div>
        <h3 class="footer-title">Contact</h3>
        <p class="footer-contact">contact@codelearn.ro</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      © {{ currentYear }} CodeLearn — Toate drepturile rezervate.
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped></style>
