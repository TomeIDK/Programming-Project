document.addEventListener('DOMContentLoaded', function () {
    function switchContent(input) {
        const contentSection = document.getElementById('content-section');

        if (input === 'reservatie') {
            contentSection.innerHTML = `
                <h3>Reservatie Beheer</h3>
                <p>Startdatum reservatie: 2024-05-16</p>
                <p>Einddatum reservatie: 2024-05-20</p>
                <form id="reservatie-form">
                    <br>
                    <button id="reservatie-annuleren" class="btn cta-button--red">Annuleren</button>
                </form>
            `;
        } else if (input === 'lening') {
            contentSection.innerHTML = `
                <h3>Lening Beheer</h3>
                <p>Startdatum lening: 2024-05-16</p>
                <p>Einddatum lening: 2024-05-20</p>
                <form id="lening-form">
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

        addEventListeners();
    }

    function addEventListeners() {
        const annulerenButton = document.querySelector('#reservatie-annuleren') || document.querySelector('#lening-annuleren');
        if (annulerenButton) {
            annulerenButton.addEventListener('click', function (event) {
                event.preventDefault();
                document.getElementById('confirmModal').style.display = 'block';
            });
        }

        const verlengenButton = document.querySelector('#lening-verlengen');
        if (verlengenButton) {
            verlengenButton.addEventListener('click', function (event) {
                event.preventDefault();
                document.getElementById('confirmModalVerlengen').style.display = 'block';
            });
        }
    }

    document.getElementById('confirmYes').addEventListener('click', function () {
        document.getElementById('confirmModal').style.display = 'none';
        window.location.href = 'bevestiging annuleren.html';
    });

    document.getElementById('confirmNo').addEventListener('click', function () {
        document.getElementById('confirmModal').style.display = 'none';
    });

    document.getElementById('confirmYesVerlengen').addEventListener('click', function () {
        document.getElementById('confirmModalVerlengen').style.display = 'none';
        window.location.href = 'bevestiging verlengen.html';
    });

    document.getElementById('confirmNoVerlengen').addEventListener('click', function () {
        document.getElementById('confirmModalVerlengen').style.display = 'none';
    });

    window.onclick = function (event) {
        if (event.target === document.getElementById('confirmModal')) {
            document.getElementById('confirmModal').style.display = 'none';
        } else if (event.target === document.getElementById('confirmModalVerlengen')) {
            document.getElementById('confirmModalVerlengen').style.display = 'none';
        }
    }

    let input = 'lening'; // Pas dit aan afhankelijk van wat je wilt testen ('reservatie' of 'lening')

    switchContent(input);
});
