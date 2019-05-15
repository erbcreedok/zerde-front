export const capitalize = function(value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export function capitalizeEach(value) {
  if (!value) return '';
  value = value.toString();
  return value.split(' ').map(v => capitalize(v)).join(' ');
}
