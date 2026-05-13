import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AIAutomationROICalculator() {
  const [inputs, setInputs] = useState({
    tasksPerWeek: 20,
    manualMinutes: 30,
    aiMinutes: 5,
    hourlyRate: 50,
    teamSize: 1,
    implementationCost: 500
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [emailCapture, setEmailCapture] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);

  const calculateROI = () => {
    const timesSavedPerTask = inputs.manualMinutes - inputs.aiMinutes;
    const weeklyMinutesSaved = timesSavedPerTask * inputs.tasksPerWeek * inputs.teamSize;
    const weeklyHoursSaved = weeklyMinutesSaved / 60;
    const annualHoursSaved = weeklyHoursSaved * 52;
    const annualCostSavings = annualHoursSaved * inputs.hourlyRate;
    const roi = ((annualCostSavings - inputs.implementationCost) / inputs.implementationCost) * 100;
    const breakEvenWeeks = inputs.implementationCost / (weeklyHoursSaved * inputs.hourlyRate);
    const productivityGain = ((inputs.manualMinutes - inputs.aiMinutes) / inputs.manualMinutes) * 100;

    setResults({
      weeklyHoursSaved: weeklyHoursSaved.toFixed(1),
      annualHoursSaved: annualHoursSaved.toFixed(0),
      annualCostSavings: annualCostSavings.toFixed(0),
      roi: roi.toFixed(0),
      breakEvenWeeks: breakEvenWeeks.toFixed(1),
      productivityGain: productivityGain.toFixed(0),
      threeYearValue: (annualCostSavings * 3 - inputs.implementationCost).toFixed(0)
    });
    setShowResults(true);
  };

  useEffect(() => {
    if (inputs.tasksPerWeek > 0 && inputs.manualMinutes > 0) {
      calculateROI();
    }
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const chartData = results ? [
    { name: 'Year 1', value: parseFloat(results.annualCostSavings) },
    { name: 'Year 2', value: parseFloat(results.annualCostSavings) },
    { name: 'Year 3', value: parseFloat(results.annualCostSavings) }
  ] : [];

  const pieData = results ? [
    { name: 'AI Time', value: inputs.aiMinutes, color: '#10b981' },
    { name: 'Time Saved', value: inputs.manualMinutes - inputs.aiMinutes, color: '#3b82f6' }
  ] : [];

  const handleExportResults = () => {
    setShowEmailForm(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // In production, this would integrate with your email service
    alert(`Results will be sent to ${emailCapture}\n\nIn production, this integrates with ConvertKit/Mailchimp`);
    setShowEmailForm(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '3rem 1.5rem',
      color: '#f1f5f9'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: '3.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', letterSpacing: '-0.02em'
          }}>
            AI Automation ROI Calculator
          </h1>
        </div>
      </div>
    </div>
  );
}
