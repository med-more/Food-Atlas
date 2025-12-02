import { useState } from 'react'
import { FaEnvelope, FaUser, FaComment, FaPaperPlane, FaCheck, FaClock } from 'react-icons/fa'
import toast from 'react-hot-toast'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        message: ''
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return pattern.test(email)
    }

    const validateForm = () => {
        const newErrors = {}

    if (!formData.nom.trim()) {
        newErrors.nom = 'Le nom est requis'
    }

    if (!formData.email.trim()) {
        newErrors.email = 'L\'email est requis'
    } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Email invalide'
    }

    if (!formData.message.trim()) {
        newErrors.message = 'Le message est requis'
    } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Le message doit contenir au moins 10 caractères'
    }

    setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }))
    }
}

    const handleSubmit = async (e) => {
        e.preventDefault()

    if (!validateForm()) {
        toast.error('Veuillez corriger les erreurs du formulaire')
        return
    }

    setIsSubmitting(true)

    // Simuler l'envoi (pas d'envoi réel)
    setTimeout(() => {
        toast.success('Message envoyé avec succès ! Nous vous répondrons sous 24-48 heures.')
        setFormData({
            nom: '',
            email: '',
            message: ''
        })
        setIsSubmitting(false)
    }, 1000)
}

    return (
    <div className="contact-page">
        <div className="contact-container">
            <div className="contact-header">
            <div className="contact-icon-circle">
                <FaEnvelope className="contact-icon" />
            </div>
            <h1 className="contact-title">Contactez-nous</h1>
            <p className="contact-subtitle">
                Vous avez une question, une suggestion ou simplement envie de partager votre expérience ? 
                N'hésitez pas à nous écrire !
            </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nom" className="form-label">
                    <FaUser className="label-icon" />
                    Nom complet
                </label>
            <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Votre nom"
                className={`form-input ${errors.nom ? 'error' : ''}`}
                />
                {errors.nom && <span className="error-message">{errors.nom}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="email" className="form-label">
                    <FaEnvelope className="label-icon" />
                    Email
                </label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre.email@exemple.com"
                className={`form-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="message" className="form-label">
                    <FaComment className="label-icon" />
                    Message
                </label>
            <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message..."
                rows="6"
                className={`form-textarea ${errors.message ? 'error' : ''}`}
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
            </div>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
                <FaPaperPlane className="submit-icon" />
                <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}</span>
            </button>
        </form>

        <div className="contact-info-cards">
            <div className="info-card">
                <FaEnvelope className="info-card-icon" />
                <h3>Email</h3>
                <p>contact@foodatlas.com</p>
            </div>
            <div className="info-card">
                <FaClock className="info-card-icon" />
                <h3>Réponse</h3>
                <p>Sous 24-48 heures</p>
            </div>
            <div className="info-card">
                <FaCheck className="info-card-icon" />
                <h3>Support</h3>
                <p>7j/7</p>
            </div>
        </div>
    </div>
</div>
)
}

export default Contact

