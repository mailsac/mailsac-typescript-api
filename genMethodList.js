const fs = require('fs');
const { Mailsac } = require('./mailsac-client');

function getFunctionArgs(func) {
  const str = func.toString();
  const argsMatch = str.match(/\(([^)]*)\)/);
  return argsMatch ? argsMatch[1].split(',').map(arg => arg.trim()) : [];
}

function generateDocs(clsInstance) {
  let output = `# \`new ${clsInstance.constructor.name}({ headers: { "Mailsac-Key": 'REPLACE_APIKEY_HERE' } })\`\n\n`;

  Object.getOwnPropertyNames(clsInstance).sort().forEach(namespace => {
    if (!clsInstance[namespace] || typeof clsInstance[namespace] !== 'object' || ['webSockets', 'webhooks'].includes(namespace)) {
      return;
    }
    output += `## ${namespace}\n`;
    Object.getOwnPropertyNames(clsInstance[namespace]).sort().forEach(method => {
      if (typeof clsInstance[namespace][method] === 'function') {
        const args = getFunctionArgs(clsInstance[namespace][method]);
        output += `### \`${namespace}.${method}(${args.join(', ')})\`\n`;
      }
    });
    output += '\n';
  });

  return output;
}

const mailsac = new Mailsac({ headers: { 'Mailsac-Key': 'key' } });
const docs = generateDocs(mailsac);

fs.writeFileSync(__dirname + '/methodList.md', docs, 'utf8');
