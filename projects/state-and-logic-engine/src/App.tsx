import { useState } from 'react';
import Card from './components/Card';
import { INITIAL_CARDS, CardState } from './constants';
import type { Card as CardType } from './logic/taskmachine';
import { moveCardToNextState, toggleCardBlocked } from './logic/taskmachine';

function App() {
  const [cards, setCards] = useState<CardType[]>(INITIAL_CARDS);
  const handleCardClick = (cardId: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? moveCardToNextState(card) : card
      )
    );
  };
  const handleToggleBlocked = (cardId: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? toggleCardBlocked(card) : card
      )
    );
  };
  const handleResetAll = () => {
    setCards(INITIAL_CARDS);
  };
  // Calculate statistics
  const blockedCount = cards.filter((c) => c.blocked).length;
  const doneCount = cards.filter((c) => c.state === CardState.DONE).length;
  const todoCount = cards.filter((c) => c.state === CardState.TODO).length;
  const inProgressCount = cards.filter((c) => c.state === CardState.IN_PROGRESS).length;
  const inReviewCount = cards.filter((c) => c.state === CardState.IN_REVIEW).length;
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fafafa',
        padding: '40px 20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '28px', color: '#333' }}>
            State & Logic Engine
          </h1>
          <button
            onClick={handleResetAll}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#d32f2f';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#f44336';
            }}
          >
            Reset All
          </button>
        </div>
        <div style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>
          Click on cards to move them to the next state. Use the block button to prevent state changes.
        </div>
        <div
          style={{
            display: 'grid',
            gap: '16px',
          }}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={handleCardClick} onToggleBlocked={handleToggleBlocked} />
          ))}
        </div>
        <div
          style={{
            marginTop: '32px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          {/* Progress Benchmark */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
            }}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              📊 State Benchmark
            </h3>
            <div style={{ display: 'grid', gap: '8px', fontSize: '13px', color: '#666' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>To Do:</span>
                <strong>{todoCount}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>In Progress:</span>
                <strong>{inProgressCount}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>In Review:</span>
                <strong>{inReviewCount}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e0e0e0', paddingTop: '8px' }}>
                <span>Done:</span>
                <strong style={{ color: '#4caf50' }}>{doneCount}</strong>
              </div>
            </div>
          </div>
          {/* Blocked Status Benchmark */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
            }}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              🔒 Blocked Status
            </h3>
            <div style={{ display: 'grid', gap: '8px', fontSize: '13px', color: '#666' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Blocked Cards:</span>
                <strong style={{ color: '#f44336' }}>{blockedCount}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Unblocked:</span>
                <strong style={{ color: '#4caf50' }}>{cards.length - blockedCount}</strong>
              </div>
              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e0e0e0' }}>
                <div
                  style={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    height: '6px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#f44336',
                      height: '100%',
                      width: `${(blockedCount / cards.length) * 100}%`,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
                <div style={{ fontSize: '12px', marginTop: '4px', color: '#999' }}>
                  {((blockedCount / cards.length) * 100).toFixed(0)}% blocked
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div
          style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Overall Progress</span>
            <span style={{ fontSize: '13px', color: '#666' }}>
              {doneCount} of {cards.length}
            </span>
          </div>
          <div
            style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              height: '8px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                backgroundColor: '#4caf50',
                height: '100%',
                width: `${(doneCount / cards.length) * 100}%`,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
