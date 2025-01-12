import React, { useState, useEffect } from 'react';

const KeyboardTest = ({ onComplete }) => {
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [totalKeys, setTotalKeys] = useState(0);

  const keyboardLayout = {
    row1: ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
    row1Extra: ['PrintScreen', 'ScrollLock', 'Pause'],
    row2: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    row3: ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
    row4: ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    row5: ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
    row6: ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight'],
    numpad: [
      'NumLock', 'NumpadDivide', 'NumpadMultiply', 'NumpadSubtract',
      'Numpad7', 'Numpad8', 'Numpad9', 'NumpadAdd',
      'Numpad4', 'Numpad5', 'Numpad6',
      'Numpad1', 'Numpad2', 'Numpad3', 'NumpadEnter',
      'Numpad0', 'NumpadDecimal'
    ]
  };

  useEffect(() => {
    const total = Object.values(keyboardLayout).reduce(
      (acc, row) => acc + row.length,
      0
    );
    // Add navigation and arrow keys to total
    setTotalKeys(total + 10); // 6 navigation keys + 4 arrow keys
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      setPressedKeys(prev => new Set([...prev, e.code]));
      
      if (pressedKeys.size + 1 === totalKeys) {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pressedKeys, totalKeys, onComplete]);

  const getKeyDisplay = (keyCode) => {
    const keyDisplayMap = {
      'Backquote': '`',
      'Minus': '-',
      'Equal': '=',
      'BracketLeft': '[',
      'BracketRight': ']',
      'Backslash': '\\',
      'Semicolon': ';',
      'Quote': "'",
      'Comma': ',',
      'Period': '.',
      'Slash': '/',
      'NumpadDivide': '/',
      'NumpadMultiply': '*',
      'NumpadSubtract': '-',
      'NumpadAdd': '+',
      'NumpadDecimal': '.',
      'MetaLeft': '⊞',
      'MetaRight': '⊞',
      'ControlLeft': 'Ctrl',
      'ControlRight': 'Ctrl',
      'AltLeft': 'Alt',
      'AltRight': 'Alt Gr',
      'ShiftLeft': '⇧',
      'ShiftRight': '⇧',
      'Escape': 'Esc',
      'ArrowUp': '↑',
      'ArrowDown': '↓',
      'ArrowLeft': '←',
      'ArrowRight': '→',
      'Enter': '↵',
      'NumpadEnter': 'Enter',
      'Backspace': '⌫',
      'Space': '',
      'Tab': '↹',
      'CapsLock': 'Caps',
      'PrintScreen': 'PrtSc',
      'ScrollLock': 'ScrLk',
      'Pause': 'Pause',
      'Insert': 'Ins',
      'Home': 'Home',
      'PageUp': 'PgUp',
      'Delete': 'Del',
      'End': 'End',
      'PageDown': 'PgDn',
      'NumLock': 'Num',
      'ContextMenu': '☰',
    };

    if (keyCode.startsWith('Numpad') && !keyDisplayMap[keyCode]) {
      return keyCode.replace('Numpad', '');
    }
    if (keyCode.startsWith('Key')) {
      return keyCode.replace('Key', '');
    }
    if (keyCode.startsWith('Digit')) {
      return keyCode.replace('Digit', '');
    }
    return keyDisplayMap[keyCode] || keyCode;
  };

  const renderKey = (keyCode, index, options = {}) => {
    const isPressed = pressedKeys.has(keyCode);
    const displayText = getKeyDisplay(keyCode);
    
    const baseClasses = `
      flex items-center justify-center
      ${options.width || 'w-12'} ${options.height || 'h-10'}
      rounded-lg
      font-medium text-sm
      transition-all duration-200
      border border-gray-700
      ${isPressed ? 
        'bg-white text-gray-900 shadow-inner' : 
        'bg-gray-800 text-gray-300 hover:bg-gray-750'}
    `;

    return (
      <div key={`${keyCode}-${index}`} className={baseClasses}>
        {displayText}
      </div>
    );
  };

  const renderNumpad = () => (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {['NumLock', 'NumpadDivide', 'NumpadMultiply', 'NumpadSubtract'].map((key, i) => 
          renderKey(key, i))}
      </div>
      <div className="flex">
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            {['Numpad7', 'Numpad8', 'Numpad9'].map((key, i) => renderKey(key, i))}
          </div>
          <div className="flex gap-1">
            {['Numpad4', 'Numpad5', 'Numpad6'].map((key, i) => renderKey(key, i))}
          </div>
          <div className="flex gap-1">
            {['Numpad1', 'Numpad2', 'Numpad3'].map((key, i) => renderKey(key, i))}
          </div>
          <div className="flex gap-1">
            {['Numpad0'].map((key, i) => renderKey(key, i, { width: 'w-[5.25rem]' }))}
            {['NumpadDecimal'].map((key, i) => renderKey(key, i))}
          </div>
        </div>
        <div className="flex flex-col gap-1 ml-1">
          {['NumpadAdd', 'NumpadEnter'].map((key, i) => 
            renderKey(key, i, { height: i === 1 ? 'h-[5.25rem]' : 'h-10' }))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center justify-center">
      <div className="flex items-start gap-2">
        <div className="bg-gray-850 p-8 rounded-xl shadow-2xl">
          {/* Function key row */}
          <div className="mb-4">
            <div className="flex gap-1">
              {keyboardLayout.row1.map((key, i) => renderKey(key, i))}
              <div className="ml-8" />
              {keyboardLayout.row1Extra.map((key, i) => renderKey(key, i))}
            </div>
          </div>

          {/* Main keyboard area with integrated navigation */}
          <div className="space-y-1">
            {/* Numbers row */}
            <div className="flex gap-1">
              {keyboardLayout.row2.map((key, i) => renderKey(key, i, {
                width: key === 'Backspace' ? 'w-16' : 'w-12'
              }))}
            </div>

            {/* Tab row + Ins, Home, PgUp */}
            <div className="flex gap-1">
              {keyboardLayout.row3.map((key, i) => renderKey(key, i, {
                width: ['Tab'].includes(key) ? 'w-16' : 'w-12'
              }))}
              <div className="ml-8 flex gap-1">
                {['Insert', 'Home', 'PageUp'].map((key, i) => 
                  renderKey(key, i, { width: 'w-12' }))}
              </div>
            </div>

            {/* Caps row + Del, End, PgDn */}
            <div className="flex gap-1">
              {keyboardLayout.row4.map((key, i) => renderKey(key, i, {
                width: ['CapsLock'].includes(key) ? 'w-16' : 
                      ['Enter'].includes(key) ? 'w-[4.5rem]' : 'w-12'
              }))}
              <div className="ml-8 flex gap-1">
                {['Delete', 'End', 'PageDown'].map((key, i) => 
                  renderKey(key, i, { width: 'w-12' }))}
              </div>
            </div>

            {/* Shift row + Up arrow */}
            <div className="flex gap-1">
              {keyboardLayout.row5.map((key, i) => renderKey(key, i, {
                width: ['ShiftLeft', 'ShiftRight'].includes(key) ? 'w-[4.7rem]' : 'w-12'
              }))}
              <div className="ml-8 flex justify-center">
                {renderKey('ArrowUp', 'up', { width: 'w-12' })}
              </div>
            </div>

            {/* Ctrl/Space row + Arrow keys */}
            <div className="flex gap-1">
              {keyboardLayout.row6.map((key, i) => renderKey(key, i, {
                width: key === 'Space' ? 'w-64' : 'w-12'
              }))}
              <div className="ml-8 flex gap-1">
                {['ArrowLeft', 'ArrowDown', 'ArrowRight'].map((key, i) => 
                  renderKey(key, i, { width: 'w-12' }))}
              </div>
            </div>
          </div>
        </div>

        {/* Numpad */}
        <div className="bg-gray-850 p-8 rounded-xl shadow-2xl">
          {renderNumpad()}
        </div>
      </div>

      {/* Progress section */}
      <div className="mt-8 text-center space-y-4">
        <p className="text-lg text-gray-300">
          Keys pressed: {pressedKeys.size} / {totalKeys}
        </p>
        <button
          onClick={onComplete}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg
                   transition duration-200 flex items-center justify-center mx-auto"
        >
          Continue to Next Test
        </button>
        <p className="text-sm text-gray-500">
          Not all keys working? You can continue to the next test anyway.
        </p>
      </div>
    </div>
  );
};

export default KeyboardTest;