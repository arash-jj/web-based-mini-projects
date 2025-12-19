import type { Card } from '../logic/taskmachine';
import { STATE_CONFIG } from '../constants';
import { isCardBlocked } from '../logic/taskmachine';

interface CardProps {
    card: Card;
    onClick: (cardId: number) => void;
    onToggleBlocked: (cardId: number) => void;
}

export default function Card({ card, onClick, onToggleBlocked }: CardProps) {
    const config = STATE_CONFIG[card.state];
    const blocked = isCardBlocked(card);
    return (
        <div
            onClick={() => !blocked && onClick(card.id)}
            style={{
                backgroundColor: config.bgColor,
                borderLeft: `4px solid ${blocked && card.blocked ? '#d32f2f' : config.color}`,
                padding: '16px',
                borderRadius: '8px',
                cursor: blocked ? 'not-allowed' : 'pointer',
                opacity: blocked && card.blocked ? 0.6 : 1,
                transition: 'all 0.2s ease',
                userSelect: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}
            onMouseEnter={(e) => {
                if (!blocked) {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
        >
            <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#333' }}>
                    {card.title}
                </h3>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span
                        style={{
                            display: 'inline-block',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: config.color,
                            padding: '4px 8px',
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            borderRadius: '4px',
                        }}
                    >
                        {config.label}
                    </span>
                    {card.state === 'done' && <span style={{ fontSize: '12px', color: '#4caf50' }}>✓ Completed</span>}
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleBlocked(card.id);
                }}
                style={{
                    padding: '6px 12px',
                    backgroundColor: card.blocked ? '#f44336' : '#e0e0e0',
                    color: card.blocked ? 'white' : '#333',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    transition: 'background-color 0.2s ease',
                    whiteSpace: 'nowrap',
                    marginLeft: '12px',
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = card.blocked ? '#d32f2f' : '#bdbdbd';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = card.blocked ? '#f44336' : '#e0e0e0';
                }}
                title={card.blocked ? 'Click to unblock' : 'Click to block'}
            >
                {card.blocked ? '🔒 Blocked' : '🔓 Unblock'}
            </button>
        </div>
    );
}
