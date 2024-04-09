export interface SurveyModel {
    date?: string;
    surveyId?: string;
    surveyName: string;
    max: number;
    min: number;
    introPrompt: string;
    outroPrompt: string;
    questions: string[];
    flags: number[];
}