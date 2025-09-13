// Utility functions for SEO Analysis scoring and status

import { Analysis } from "./AllUserAnalysis";

export interface ScoreStatus {
  category: 'good' | 'moderate' | 'poor';
  percentage: number;
  colorClass: string;
  bgClass: string;
}


/**
 * Calculate overall score from analysis object by aggregating all sub-scores
 * @param analysis - The analysis object containing nested scores
 * @returns Calculated overall score (0-100)
 */
export const calculateOverallScore = (analysis: Partial<Analysis>): number => {
  const scores: number[] = [];

  // On-page scores
  if (analysis.on_page) {
    const { links, title, images, headings, metaDescription } = analysis.on_page;
    
    if (links?.score !== undefined) scores.push(links.score);
    if (title?.score !== undefined) scores.push(title.score);
    if (images?.score !== undefined) scores.push(images.score);
    if (headings?.score !== undefined) scores.push(headings.score);
    if (metaDescription?.score !== undefined) scores.push(metaDescription.score);
  }

  // Content scores
  if (analysis.content) {
    const { score, contentQuality, readabilityScore } = analysis.content;
    
    if (score !== undefined) scores.push(score);
    if (contentQuality?.score !== undefined) scores.push(contentQuality.score);
    if (readabilityScore !== undefined) scores.push(readabilityScore);
  }

  // Technical scores
  if (analysis.technical) {
    const { ssl, score, mobile, pageSpeed, structure } = analysis.technical;
    
    if (ssl?.score !== undefined) scores.push(ssl.score);
    if (score !== undefined) scores.push(score);
    if (mobile?.score !== undefined) scores.push(mobile.score);
    if (pageSpeed?.score !== undefined) scores.push(pageSpeed.score);
    if (structure?.score !== undefined) scores.push(structure.score);
  }

  // Calculate weighted average (or simple average if no weights specified)
  if (scores.length === 0) return 0;
  
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  return Math.round(totalScore / scores.length);
};

/**
 * Get comprehensive score status information
 * @param score - The score value (0-100)
 * @returns ScoreStatus object with category, percentage, and styling classes
 */
export const getScoreStatus = (score: number): ScoreStatus => {
  const percentage = Math.round(score);
  
  if (score >= 70) {
    return {
      category: 'good',
      percentage,
      colorClass: 'text-green-600',
      bgClass: 'bg-green-100 border-green-200'
    };
  }
  
  if (score >= 40) {
    return {
      category: 'moderate',
      percentage,
      colorClass: 'text-yellow-600',
      bgClass: 'bg-yellow-100 border-yellow-200'
    };
  }
  
  return {
    category: 'poor',
    percentage,
    colorClass: 'text-red-600',
    bgClass: 'bg-red-100 border-red-200'
  };
};

/**
 * Get comprehensive score status using calculated overall score
 * @param analysis - The analysis object
 * @returns ScoreStatus object with calculated score and styling
 */
export const getAnalysisScoreStatus = (analysis: Partial<Analysis>): ScoreStatus => {
  const calculatedScore = calculateOverallScore(analysis);
  return getScoreStatus(calculatedScore);
};

/**
 * Get score category only
 * @param score - The score value (0-100)
 * @returns Category string
 */
export const getScoreCategory = (score: number): 'good' | 'moderate' | 'poor' => {
  if (score >= 70) return 'good';
  if (score >= 40) return 'moderate';
  return 'poor';
};

/**
 * Get score color class only
 * @param score - The score value (0-100)
 * @returns Tailwind color class string
 */
export const getScoreColor = (score: number): string => {
  if (score >= 70) return 'text-green-600';
  if (score >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * Get score background class only
 * @param score - The score value (0-100)
 * @returns Tailwind background class string
 */
export const getScoreBg = (score: number): string => {
  if (score >= 70) return 'bg-green-100 border-green-200';
  if (score >= 40) return 'bg-yellow-100 border-yellow-200';
  return 'bg-red-100 border-red-200';
};

/**
 * Calculate statistics for multiple analyses using calculated overall scores
 * @param analyses - Array of analysis objects
 * @returns Stats object with total, good, moderate, and poor counts
 */
export const calculateAnalysisStats = (analyses: Partial<Analysis>[]) => {
  const total = analyses.length;
  const good = analyses.filter(a => {
    const score = calculateOverallScore(a);
    return getScoreCategory(score) === 'good';
  }).length;
  const moderate = analyses.filter(a => {
    const score = calculateOverallScore(a);
    return getScoreCategory(score) === 'moderate';
  }).length;
  const poor = analyses.filter(a => {
    const score = calculateOverallScore(a);
    return getScoreCategory(score) === 'poor';
  }).length;
  
  return { total, good, moderate, poor };
};

/**
 * Get detailed score breakdown for an analysis
 * @param analysis - The analysis object
 * @returns Object with category scores and overall calculated score
 */
export const getScoreBreakdown = (analysis: Partial<Analysis>) => {
  const onPageScores: number[] = [];
  const contentScores: number[] = [];
  const technicalScores: number[] = [];

  // On-page scores
  if (analysis.on_page) {
    const { links, title, images, headings, metaDescription } = analysis.on_page;
    if (links?.score !== undefined) onPageScores.push(links.score);
    if (title?.score !== undefined) onPageScores.push(title.score);
    if (images?.score !== undefined) onPageScores.push(images.score);
    if (headings?.score !== undefined) onPageScores.push(headings.score);
    if (metaDescription?.score !== undefined) onPageScores.push(metaDescription.score);
  }

  // Content scores
  if (analysis.content) {
    const { score, contentQuality, readabilityScore } = analysis.content;
    if (score !== undefined) contentScores.push(score);
    if (contentQuality?.score !== undefined) contentScores.push(contentQuality.score);
    if (readabilityScore !== undefined) contentScores.push(readabilityScore);
  }

  // Technical scores
  if (analysis.technical) {
    const { ssl, score, mobile, pageSpeed, structure } = analysis.technical;
    if (ssl?.score !== undefined) technicalScores.push(ssl.score);
    if (score !== undefined) technicalScores.push(score);
    if (mobile?.score !== undefined) technicalScores.push(mobile.score);
    if (pageSpeed?.score !== undefined) technicalScores.push(pageSpeed.score);
    if (structure?.score !== undefined) technicalScores.push(structure.score);
  }

  const onPageAvg = onPageScores.length > 0 ? Math.round(onPageScores.reduce((a, b) => a + b, 0) / onPageScores.length) : 0;
  const contentAvg = contentScores.length > 0 ? Math.round(contentScores.reduce((a, b) => a + b, 0) / contentScores.length) : 0;
  const technicalAvg = technicalScores.length > 0 ? Math.round(technicalScores.reduce((a, b) => a + b, 0) / technicalScores.length) : 0;
  
  return {
    onPage: onPageAvg,
    content: contentAvg,
    technical: technicalAvg,
    overall: calculateOverallScore(analysis)
  };
};