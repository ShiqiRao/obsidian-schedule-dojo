export default function TimelineView(): JSX.Element {
  return (
    <div className="root" data-type="timeline">
      <div className="header" style={
        {
          height: 'var(--size-4-9)',
          boxShadow: 'var(--shadow-bottom)',
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          gridTemplateColumns: 'repeat(2, var(--size-4-8)) 1fr repeat(2, var(--size-4-8))',
        }
      }>
        <div className="clickable-icon header-today-icon" style={
          {
            width: 'var(--size-4-8)',
            height: 'var(--size-4-8)',
          }
        }>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h4M9 3v4a1 1 0 0 1-1 1H4m11 6v4m-2-2h4m3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
          </svg>

        </div>
        <div className="clickable-icon header-matrix-icon" style={
          {
            width: 'var(--size-4-8)',
            height: 'var(--size-4-8)',
          }
        }>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
          </svg>

        </div>
        <div className="header-date-container" style={
          {
            display: 'grid',
            gridTemplateColumns: 'var(--size-4-8) 1fr var(--size-4-8)',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 'var(--size-4-4)',
            color: 'var(--text-muted)',
          }
        }>
          <div className="clickable-icon prev-date-button" style={
            {
              textAlign: 'right',
            }
          }>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
            </svg>
          </div>
          <div className="header-date" style={
            {
              textAlign: 'center',
            }
          }>2024-05-19</div>
          <div className="clickable-icon next-date-button">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="header-placeholder-1" style={
          {
            width: 'var(--size-4-8)',
            height: 'var(--size-4-8)',
          }
        }></div>
        <div className="header-placeholder-2" style={
          {
            width: 'var(--size-4-8)',
            height: 'var(--size-4-8)',
          }
        }></div>
      </div>
      <div className="unplan"></div>
      <div className="plan">
        <div className="plan-matrix"></div>
        <div className="plan-timeline">
          <div className="plan-timeline-hand"></div>
        </div>
      </div>
    </div>
  );
};