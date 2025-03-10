import React, { useState } from 'react';
import '../../Css/FaqPage.css';

const faqs = [
    {
      question: "How do I apply for a job?",
      answer: "You can apply through our online application portal available on the website."
    },
    {
      question: "Do I need a resume?",
      answer: "Yes, please submit a current resume with your application to help us better assess your skills."
    },
    {
      question: "What positions are available?",
      answer: "We offer full-time, part-time, and remote opportunities across various industries."
    },
    {
      question: "How do I contact HR?",
      answer: "You can contact our HR team at hr@employmentwebsite.com or call our office during business hours."
    },
    {
      question: "What benefits are provided?",
      answer: "Our employment package includes competitive salary, health insurance, paid time off, and professional development opportunities."
    },
    {
      question: "Is there an interview process?",
      answer: "Yes, after the initial application review, selected candidates will be invited for a phone or in-person interview."
    },
    {
      question: "Can I apply for multiple positions?",
      answer: "Absolutely, we encourage candidates to apply for any position that fits their skills and interests."
    },
    {
      question: "Do you offer remote work opportunities?",
      answer: "Yes, many positions on our website are remote or offer flexible working arrangements."
    },
    {
      question: "What is the expected response time?",
      answer: "You can expect to hear back from us within two weeks after your application has been submitted."
    },
    {
      question: "Where can I find information about company culture?",
      answer: "We have a dedicated 'About Us' page on our website that provides detailed insights into our company culture and values."
    }
  ];
  
  const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="faq-item">
        <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
          <h3>{question}</h3>
          <span className="faq-toggle">{isOpen ? '-' : '+'}</span>
        </div>
        {isOpen && (
          <div className="faq-answer">
            <p>{answer}</p>
          </div>
        )}
      </div>
    );
  };
  
  const FaqPage = () => {
    return (
      <div className="faq-page">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    );
  };
  
  export default FaqPage;