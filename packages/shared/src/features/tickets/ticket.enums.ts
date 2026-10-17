const ISSUE_TYPE = ['BUG', 'FEATURE_REQUEST', 'TASK', 'IMPROVEMENT'] as const;
const CATEGORY = ['SERVER', 'CLIENT', 'DATABASE', 'INFRA', 'OTHER'] as const;
const PRIORITY = ['LOWEST', 'LOW', 'MEDIUM', 'HIGH', 'HIGHEST'] as const;
const SEVERITY = ['TRIVIAL', 'MINOR', 'MAJOR', 'CRITICAL', 'BLOCKER'] as const;

const toSentenceCase = (string: string) => {
    const sentence = string.split('_').join(' ').toLowerCase();
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

export { ISSUE_TYPE, CATEGORY, PRIORITY, SEVERITY, toSentenceCase };
