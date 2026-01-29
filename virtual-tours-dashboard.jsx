import React, { useState, useMemo } from 'react';

const buildings = [
  { id: 1, code: 'AH_224 + AH_225', url: 'https://maps.app.goo.gl/yVumhw1pP2QfzttX8' },
  { id: 2, code: 'AH_226', url: 'https://maps.app.goo.gl/5v3NggenvuFJAeLg7' },
  { id: 3, code: 'AH_229', url: 'https://maps.app.goo.gl/yGG5zJbHLqZTKzDD8' },
  { id: 4, code: 'AH_230', url: 'https://maps.app.goo.gl/qBCn3BNZ52RqYMyr7' },
  { id: 5, code: 'AH_232', url: 'https://maps.app.goo.gl/9dNhv4Ahw2KiVp9v7' },
  { id: 6, code: 'AH_233', url: 'https://maps.app.goo.gl/awKP7wjaqRMYjroLA' },
  { id: 7, code: 'AH_234', url: 'https://maps.app.goo.gl/dcwAt1kVXdV3LihA9' },
  { id: 8, code: 'AH_235', url: 'https://maps.app.goo.gl/bTo9NKu4VHrPtbGh8' },
  { id: 9, code: 'AH_236 & 223', url: 'https://maps.app.goo.gl/EJ3qSjrpZfH7dRbU7' },
  { id: 10, code: 'AH_57', url: 'https://maps.app.goo.gl/JdZ1f57oRXwpAeeVA' },
  { id: 11, code: 'AH_59', url: 'https://maps.app.goo.gl/rwhUYm8ekqeZZVji9' },
  { id: 12, code: 'AH_61', url: 'https://maps.app.goo.gl/TEkGqdHtvXGXSAcg9' },
];

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

const Building360Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    <path d="M2 12h20"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ 
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s ease'
    }}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function VirtualToursDashboard() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const filteredBuildings = useMemo(() => {
    if (!searchQuery.trim()) return buildings;
    const query = searchQuery.toLowerCase();
    return buildings.filter(b => 
      b.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleBuildingSelect = (building) => {
    if (selectedBuilding?.id === building.id) return;
    setIsLoading(true);
    setSelectedBuilding(building);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0d0d14 100%)',
      fontFamily: '"DM Sans", system-ui, sans-serif',
      color: '#e8e8ed',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background effects */}
      <div style={{
        position: 'fixed',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-30%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '320px' : '0px',
        minWidth: sidebarOpen ? '320px' : '0px',
        background: 'rgba(18, 18, 26, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 10,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '28px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)'
            }}>
              <Building360Icon />
            </div>
            <div>
              <h1 style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>Visites 360°</h1>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.4)',
                margin: 0
              }}>{buildings.length} bâtiments</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '20px 24px' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              position: 'absolute',
              left: '14px',
              color: 'rgba(255,255,255,0.3)',
              pointerEvents: 'none',
              display: 'flex'
            }}>
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Rechercher un bâtiment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 14px 14px 44px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                color: '#e8e8ed',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                e.target.style.background = 'rgba(255,255,255,0.06)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                e.target.style.background = 'rgba(255,255,255,0.04)';
              }}
            />
          </div>
        </div>

        {/* Building List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 12px 24px 12px'
        }}>
          {filteredBuildings.length === 0 ? (
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.4)'
            }}>
              <p style={{ fontSize: '14px', margin: 0 }}>Aucun résultat pour "{searchQuery}"</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {filteredBuildings.map((building, index) => (
                <button
                  key={building.id}
                  onClick={() => handleBuildingSelect(building)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: selectedBuilding?.id === building.id 
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)'
                      : 'transparent',
                    border: selectedBuilding?.id === building.id 
                      ? '1px solid rgba(99, 102, 241, 0.3)'
                      : '1px solid transparent',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    animation: `fadeSlideIn 0.4s ease ${index * 0.05}s both`
                  }}
                  onMouseEnter={(e) => {
                    if (selectedBuilding?.id !== building.id) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedBuilding?.id !== building.id) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: selectedBuilding?.id === building.id
                      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                      : 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: selectedBuilding?.id === building.id ? '#fff' : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.25s ease',
                    flexShrink: 0
                  }}>
                    {building.code.split('_')[1]?.substring(0, 3) || '360'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: selectedBuilding?.id === building.id ? '#fff' : 'rgba(255,255,255,0.85)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {building.code}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.35)',
                      marginTop: '2px'
                    }}>
                      Vue Street View
                    </div>
                  </div>
                  {selectedBuilding?.id === building.id && (
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#10b981',
                      boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
                      animation: 'pulse 2s ease-in-out infinite'
                    }} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: 'absolute',
          left: sidebarOpen ? '308px' : '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '28px',
          height: '56px',
          background: 'rgba(18, 18, 26, 0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '0 8px 8px 0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.5)',
          zIndex: 20,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        }}
      >
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          style={{
            transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
        >
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Top Bar */}
        <header style={{
          padding: '20px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.04)'
        }}>
          <div>
            {selectedBuilding ? (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <h2 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}>
                  Bâtiment {selectedBuilding.code}
                </h2>
                <p style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.4)',
                  margin: '4px 0 0 0'
                }}>
                  Vue immersive Google Street View
                </p>
              </div>
            ) : (
              <div>
                <h2 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}>
                  Bienvenue
                </h2>
                <p style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.4)',
                  margin: '4px 0 0 0'
                }}>
                  Sélectionnez un bâtiment pour commencer
                </p>
              </div>
            )}
          </div>
          {selectedBuilding && (
            <a
              href={selectedBuilding.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '13px',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
              }}
            >
              Ouvrir dans Maps
              <ExternalLinkIcon />
            </a>
          )}
        </header>

        {/* Viewer Area */}
        <div style={{
          flex: 1,
          padding: '24px 32px 32px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {selectedBuilding ? (
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              animation: 'scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {isLoading && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(10, 10, 15, 0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    border: '3px solid rgba(99, 102, 241, 0.2)',
                    borderTopColor: '#6366f1',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <p style={{
                    marginTop: '16px',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)'
                  }}>
                    Chargement de la vue 360°...
                  </p>
                </div>
              )}
              <iframe
                src={selectedBuilding.url}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  opacity: isLoading ? 0 : 1,
                  transition: 'opacity 0.3s ease'
                }}
                title={`Vue 360° - ${selectedBuilding.code}`}
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              maxWidth: '400px',
              animation: 'fadeIn 0.5s ease'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto'
              }}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  <path d="M2 12h20"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                margin: '0 0 12px 0',
                letterSpacing: '-0.02em'
              }}>
                Explorez vos bâtiments
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: '1.6',
                margin: 0
              }}>
                Sélectionnez un bâtiment dans la liste pour afficher sa visite virtuelle 360° directement ici.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
        
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
