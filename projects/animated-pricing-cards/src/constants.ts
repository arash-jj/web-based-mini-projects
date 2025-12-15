export interface PricingTier {
    id: string;
    name: string;
    description: string;
    price: number;
    period: string;
    features: string[];
    highlighted: boolean;
    ctaText: string;
    ctaLink: string;
}

export const PRICING_TIERS: PricingTier[] = [
    {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for getting started',
    price: 29,
    period: '/month',
    features: [
        'Up to 10 projects',
        '5GB storage',
        'Basic support',
        'Email notifications',
        'Community access'
    ],
    highlighted: false,
    ctaText: 'Get Started',
    ctaLink: '#'
    },
    {
    id: 'professional',
    name: 'Professional',
    description: 'For growing teams',
    price: 79,
    period: '/month',
    features: [
        'Unlimited projects',
        '500GB storage',
        'Priority support',
        'Advanced analytics',
        'Team collaboration',
        'Custom integrations',
        'API access'
    ],
    highlighted: true,
    ctaText: 'Start Free Trial',
    ctaLink: '#'
    },
    {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: 299,
    period: '/month',
    features: [
        'Unlimited everything',
        'Unlimited storage',
        '24/7 dedicated support',
        'Advanced security',
        'Custom deployment',
        'SSO & SAML',
        'SLA guarantee',
        'Dedicated account manager'
    ],
    highlighted: false,
    ctaText: 'Contact Sales',
    ctaLink: '#'
    }
];

export const CURRENCY_SYMBOL = '$';
export const BILLING_PERIOD = 'Annual billing available - Save 20%';
