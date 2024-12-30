document.querySelector('.contactForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
  
    const email = document.querySelector('input[placeholder="Email"]').value;
    const telephone = document.querySelector('input[placeholder="Téléphone"]').value;
    const nomPrenom = document.querySelector('input[placeholder="Nom Prenom"]').value;
    const message = document.querySelector('#message').value;
  
    // Construire le payload
    const payload = {
      data: {
        email: email,
        telephone: telephone,
        nomPrenom: nomPrenom,
        message: message,
      },
    };
  
    try {
      // Envoyer la requête POST à l'API Strapi
      const response = await fetch('http://localhost:1337/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) 
      {
        alert('Votre message a bien été envoyé !');
        document.querySelector('.contactForm').reset();
      } 
      else 
      {
        alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('Erreur lors de l’envoi:', error);
      alert("Erreur de connexion au serveur. Veuillez réessayer.");
    }
  });
  