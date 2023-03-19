export function _responsive(
  media, // [360, 600, 900, 1200, 1800, 2400],
  values, // props.$border // [1, 2, 3, 4]
  callback
) {
  const statements = values?.map(callback) || [];

  return statements.map((statement, mediaIndex) => {
    if (mediaIndex === 0) return statement;

    return {
      [`@media screen and (min-width: ${media[mediaIndex - 1]}px)`]: statement,
    };
  });
}

function border(props) {
  const { theme } = props;
  const { media } = theme.sanity;

  return _responsive(media, props.$border, (value) =>
    value ? { "&&": { color: value } } : { "&&": { color: null } }
  );
}
