/* @flow */
import { GraphQLScalarType, GraphQLError } from 'graphql';

import { Kind } from 'graphql/language';
import type { ASTNode } from 'graphql/language';

function parseDate(value: mixed): string {
  if (typeof value === 'string') {
    const result = Date.parse(value);
    if (!isNaN(result)) {
      return new Date(result).toJSON();
    }
  }
  if (typeof value === 'object' && value instanceof Date) {
    if (isNaN(value.getTime())) {
      throw new Error('Field error: value for date field is an invalid date');
    }
    return value.toJSON();
  }
  throw new Error('Field error: The Date scalar needs to be a parsable date string or date object');
}

const DateScalar: GraphQLScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'A date scalar that parses and serializes data',
  serialize: parseDate,
  parseValue: parseDate,
  parseLiteral(ast: ASTNode) {
    if (ast.kind === Kind.STRING) {
      const result = new Date(ast.value);
      if (isNaN(result.getTime())) {
        throw new GraphQLError('Query error: Could not parse date into valid string', [ast]);
      }
      if (ast.value !== result.toJSON()) {
        throw new GraphQLError('Query error: Date format must be: YYYY-MM-DDTHH:MM:SS.SSSZ', [ast]);
      }
      return result;
    }
    throw new GraphQLError('Query error: Date must be a parsable date string', [ast]);
  },
});

export default DateScalar;
