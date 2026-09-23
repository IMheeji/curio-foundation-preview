// CURIO Foundation only: reusable DOM skeletons without routes, auth or data flows.
export const GOODS_STATUSES = Object.freeze(['WANT', 'PLANNED', 'OWNED', 'DUPLICATE', 'TRADE', 'ARCHIVED']);
export const GLOBAL_TABS = Object.freeze([
  { id: 'home', label: '홈', icon: 'home' },
  { id: 'discover', label: '발견하기', icon: 'search' },
  { id: 'collection', label: '컬렉션', icon: 'collection' },
  { id: 'trade', label: '교환하기', icon: 'trade' },
  { id: 'my', label: '마이', icon: 'my' },
]);

const svgNS = 'http://www.w3.org/2000/svg';
const paths = {
  home: 'M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z',
  search: 'M20 20l-4.3-4.3M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z',
  collection: 'M4 3h16v18H4zM8 7h8M8 12h8M8 17h5',
  trade: 'M4 7h16m0 0-4-4m4 4-4 4M20 17H4m0 0 4-4m-4 4 4 4',
  my: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0',
  back: 'm15 4-8 8 8 8',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  bell: 'M5 18h14l-2-3V9a5 5 0 0 0-10 0v6l-2 3ZM10 21h4',
};

export function createIcon(name) {
  if (!paths[name]) throw new RangeError(`Unknown icon: ${name}`);
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', paths[name]);
  svg.append(path);
  return svg;
}

export function createIconButton({ icon, label, disabled = false }) {
  if (!label) throw new TypeError('Icon buttons require an aria-label');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'curio-icon-button';
  button.setAttribute('aria-label', label);
  button.disabled = disabled;
  button.append(createIcon(icon));
  return button;
}

export function createButton({ label, variant = 'primary', full = false, disabled = false }) {
  const variants = ['primary', 'secondary', 'text'];
  if (!variants.includes(variant)) throw new RangeError(`Unknown button variant: ${variant}`);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `curio-button${variant === 'primary' ? '' : ` curio-button--${variant}`}${full ? ' curio-button--full' : ''}`;
  button.textContent = label;
  button.disabled = disabled;
  return button;
}

export function createHeader({ title, variant = 'title' }) {
  const variants = ['title', 'back', 'search', 'more', 'notification'];
  if (!variants.includes(variant)) throw new RangeError(`Unknown header variant: ${variant}`);
  const header = document.createElement('header');
  header.className = 'curio-header';
  header.append(variant === 'back' ? createIconButton({ icon: 'back', label: '뒤로 가기' }) : Object.assign(document.createElement('span'), { className: 'curio-header__spacer' }));
  const heading = document.createElement('h2');
  heading.className = 'curio-header__title text-h2';
  heading.textContent = title;
  header.append(heading);
  const actions = document.createElement('div');
  actions.className = 'curio-header__actions';
  const action = { search: ['search', '검색'], more: ['more', '더 보기'], notification: ['bell', '알림'] }[variant];
  if (action) actions.append(createIconButton({ icon: action[0], label: action[1] }));
  header.append(actions);
  return header;
}

export function createBottomNavigation({ active = 'home' } = {}) {
  const nav = document.createElement('nav');
  nav.className = 'curio-bottom-nav';
  nav.setAttribute('aria-label', '주요 메뉴');
  for (const item of GLOBAL_TABS) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'curio-nav-item';
    button.dataset.tab = item.id;
    if (active === item.id) button.setAttribute('aria-current', 'page');
    button.append(createIcon(item.icon), document.createTextNode(item.label));
    nav.append(button);
  }
  return nav;
}

export function createGoodsStatusBadge(status, label) {
  if (!GOODS_STATUSES.includes(status)) throw new RangeError(`Not a Goods status: ${status}`);
  const badge = document.createElement('span');
  badge.className = `curio-status curio-status--${status.toLowerCase()}`;
  badge.textContent = label ?? status;
  return badge;
}

export function createCardShell(kind, { media = false, label = '' } = {}) {
  const kinds = ['base', 'feature', 'goods', 'event', 'trade', 'cover', 'summary', 'passport'];
  if (!kinds.includes(kind)) throw new RangeError(`Unknown card kind: ${kind}`);
  const card = document.createElement('article');
  card.className = `curio-card${kind === 'base' ? '' : ` curio-card--${kind}`}`;
  if (media) {
    const image = document.createElement('div');
    image.className = 'curio-card__media text-caption';
    image.setAttribute('aria-hidden', 'true');
    image.textContent = '이미지 영역';
    card.append(image);
  }
  const body = document.createElement('div');
  body.className = 'curio-card__body text-small';
  body.textContent = label || '콘텐츠 영역';
  card.append(body);
  return card;
}
