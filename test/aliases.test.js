import test from 'ava';
import emojiRegex from 'emoji-regex/text';
import {length} from 'stringz';
import aliases from '../aliases';
import {types, typesOrder} from '../types';

/* eslint valid-typeof: ["error", {requireStringLiterals: false}] */

/**
 * AVA macro that verifies that each object in `object` has the property `prop` of type `type`.
 *
 * @method hasProperty
 * @param {Object} t AVA assertion librarie
 * @param {string} object object to verify
 * @param {string} prop property to verify
 * @param {string} type type to verify
 */
function hasProperty(t, object, prop, type) {
	for (const obj in object) {
		if (Reflect.apply(Object.prototype.hasOwnProperty, object, [obj])) {
			t.true(Reflect.apply(Object.prototype.hasOwnProperty, object[obj], [prop]));
			if (type === 'string') {
				t.true(typeof object[obj][prop] === type);
			} else if (type === 'emoji') {
				t.true(emojiRegex({exact: true}).test(object[obj][prop]));
				t.is(length(object[obj][prop]), 1);
			}
		}
	}
}

test('Each alias has the property title', hasProperty, aliases, 'title', 'string');
test('Each type has the property description', hasProperty, aliases, 'description', 'string');
test('Each type has the property emoji', hasProperty, aliases, 'emoji', 'emoji');

test('Each alias`s type property has a value that exists in types', t => {
	for (const alias in aliases) {
		if (Reflect.apply(Object.prototype.hasOwnProperty, aliases, [alias])) {
			t.true(Reflect.apply(Object.prototype.hasOwnProperty, types, [aliases[alias].type]));
		}
	}
});

test('Each alias exists in typesOrder', t => {
	for (const type in types) {
		if (Reflect.apply(Object.prototype.hasOwnProperty, types, [type])) {
			t.true(typesOrder.includes(type));
		}
	}
});
