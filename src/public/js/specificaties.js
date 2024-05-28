document.addEventListener('DOMContentLoaded', function () {
    function switchContent(input) {
      const contentSection = document.getElementById('content-section');

      if (input === 'reservatie') {
        contentSection.innerHTML = `
          <h3>Reservatie Beheer</h3>
          <!-- Voeg hier de HTML-inhoud toe voor reservatiebeheer -->
          <p>Startdatum reservatie: 2024-05-16</p>
          <p>Einddatum reservatie: 2024-05-20</p>
          <form id="reservatie-form">
            <br>
            <button class="btn cta-button--red">Annuleren</button>
            <!-- Voeg hier verdere HTML-inhoud toe voor reservatiebeheer -->
          </form>
        `;
      } else if (input === 'lening') {
        contentSection.innerHTML = `
          <h3>Lening Beheer</h3>
          <p>Startdatum lening: 2024-05-16</p>
          <p>Einddatum lening: 2024-05-20</p>
          <form id="lening-form">
            <!-- Voeg hier de HTML-inhoud toe voor leningbeheer -->
            <br>
            <button id="lening-annuleren" class="btn cta-button--red">Annuleren</button>
            <button id="lening-verlengen" class="btn secondary-button">Verlengen</button><br>
            <br>
            <label for="schade">Heeft dit product schade opgelopen bij deze lening?</label><br>
            <input type="radio" id="schade-ja" name="schade" value="Ja">
            <label for="schade-ja">Ja</label><br>
            <input type="radio" id="schade-nee" name="schade" value="Nee">
            <label for="schade-nee">Nee</label><br>
            <label for="extra-commentaar">Extra commentaar schade:</label><br>
            <textarea id="extra-commentaar" name="extra-commentaar" rows="4" cols="50"></textarea><br>
            <br>
            <button type="submit" class="btn cta-button--blue">Opslaan</button>
          </form>
        `;
      }
    }

    let input = 'lening'; 

    switchContent(input);
  });