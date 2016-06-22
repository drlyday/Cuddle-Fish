using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;

namespace Foundation.Coding.Extensions
{
    public static class CollectionExtensions
    {
        /// <summary>
        ///     Adds a range of value uniquely to a collection and returns the amount of values added.
        /// </summary>
        /// <typeparam name = "T">The generic collection value type.</typeparam>
        /// <param name = "collection">The collection.</param>
        /// <param name = "values">The values to be added.</param>
        /// <returns>The amount if values that were added.</returns>
        public static int AddRangeUnique<T>(this ICollection<T> collection, IEnumerable<T> values)
        {
            var count = 0;
            foreach (var value in values)
            {
                if (collection.AddUnique(value))
                {
                    count++;
                }
            }
            return count;
        }

        /// <summary>
        ///     Adds a value uniquely to to a collection and returns a value whether the value was added or not.
        /// </summary>
        /// <typeparam name = "T">The generic collection value type</typeparam>
        /// <param name = "collection">The collection.</param>
        /// <param name = "value">The value to be added.</param>
        /// <returns>Indicates whether the value was added or not</returns>
        /// <example>
        ///     <code>
        ///         list.AddUnique(1); // returns true;
        ///         list.AddUnique(1); // returns false the second time;
        ///     </code>
        /// </example>
        public static bool AddUnique<T>(this ICollection<T> collection, T value)
        {
            var alreadyHas = collection.Contains(value);
            if (!alreadyHas)
            {
                collection.Add(value);
            }
            return alreadyHas;
        }

        /// <summary>
        /// Appends individual items to a sequence.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sequence"></param>
        /// <param name="otherStuff"></param>
        /// <returns></returns>
        public static IEnumerable<T> Append<T>(this IEnumerable<T> sequence, params T[] otherStuff)
        {
            foreach (var v in sequence)
            {
                yield return v;
            }

            foreach (var v in otherStuff)
            {
                yield return v;
            }
        }

        /// <summary>
        /// Consumes the elements in a sequence. See remarks for more information.
        /// </summary>
        /// <remarks>
        /// This method essentially does nothing except to eagerly evaluate the sequence. There are times when you simply
        /// want to iterate the sequence but do not want to store or do anything additional with the elements that are in
        /// the sequence. Prefer this to, for example, <c>var dummy = sequence.ToList()</c> or simply <c>sequence.ToList()</c>.
        /// </remarks>
        /// <typeparam name="T">The type of the items in the sequence.</typeparam>
        /// <param name="source">The sequence to consume.</param>
        [DebuggerStepThrough]
        public static void Consume<T>(this IEnumerable<T> source)
        {
            //Guard.ArgumentNotNull(nameof(source), source);
            var e = source.GetEnumerator();
            while (e.MoveNext())
            {
            }
        }

        /// <summary>
        ///    Get Distinct
        /// </summary>
        /// <param name = "source"></param>
        /// <param name = "expression"></param>
        /// <typeparam name = "T"></typeparam>
        /// <typeparam name = "TKey"></typeparam>
        /// <returns></returns>
        /// <remarks>
        ///     Contributed by Michael T, http://about.me/MichaelTran
        /// </remarks>
        public static IEnumerable<T> Distinct<T, TKey>(this IEnumerable<T> source, Func<T, TKey> expression)
        {
            return source == null ? Enumerable.Empty<T>() : source.GroupBy(expression).Select(i => i.First<T>());
        }

        /// <summary>
        /// Adds an Extension Method to Determine if a Collection has distinct values based on a property defined by a lambda expression
        /// </summary>
        /// <typeparam name="TSource">Collection</typeparam>
        /// <typeparam name="TKey"></typeparam>
        /// <param name="source"></param>
        /// <param name="keySelector">Lambda Expression</param>
        /// <returns></returns>
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
        {
            var seenKeys = new HashSet<TKey>();
            return source.Where(element => seenKeys.Add(keySelector(element)));
        }

        /// <summary>
        /// Applies an action to each element of a sequence and yields the sequence.
        /// </summary>
        /// <typeparam name="T">The type of the elements in the sequence.</typeparam>
        /// <param name="source">The sequence to enumerate.</param>
        /// <param name="action">The action to apply to each item in the sequence.</param>
        /// <exception cref="ArgumentNullException">One of the arguments is null.</exception>
        [DebuggerStepThrough]
        public static IEnumerable<T> Do<T>(this IEnumerable<T> source, Action<T> action)
        {
            //Guard.ArgumentNotNull(nameof(source), source);
            //Guard.ArgumentNotNull(nameof(action), action);
            var e = source.GetEnumerator();
            while (e.MoveNext())
            {
                action(e.Current);
                yield return e.Current;
            }
        }

        public static IEnumerable<T> Except<T>(this IEnumerable<T> source, T excludedItem)
        {
            return source.Except(new[] { excludedItem });
        }

        /// <summary>
        /// Applies an action to each element of a sequence.
        /// </summary>
        /// <typeparam name="T">The type of the elements in the sequence.</typeparam>
        /// <param name="source">The sequence to enumerate.</param>
        /// <param name="action">The action to apply to each item in the sequence.</param>
        /// <exception cref="ArgumentNullException">One of the arguments is null.</exception>
        [DebuggerStepThrough]
        public static void ForEach<T>(this IEnumerable<T> source, Action<T> action)
        {
            foreach (var obj in source)
            {
                action(obj);
            }
        }

        public static void ForEach<T>(this IEnumerable<T> source, Action<T, int> action)
        {
            //Guard.ArgumentNotNull(nameof(source), source);
            //Guard.ArgumentNotNull(nameof(action), action);
            var e = source.GetEnumerator();
            var i = 0;
            while (e.MoveNext())
            {
                action(e.Current, i);
                i++;
            }
        }

        public static T GetValue<T>(this IDictionary<string, string> source, string key, T defaultValue)
        {
            string o;
            if (!source.TryGetValue(key, out o))
            {
                return defaultValue;
            }

            if (typeof(T).IsEnum)
            {
                return (T)Enum.Parse(typeof(T), o);
            }

            try
            {
                return (T)Convert.ChangeType(o, typeof(T));
            }
            catch (InvalidCastException)
            {
                return defaultValue;
            }
        }


        /// <summary>
        ///   Returns a selected value when the source is not null; null otherwise.
        /// </summary>
        /// <typeparam name = "T">Type of the source object.</typeparam>
        /// <typeparam name = "TInner">Type of the object which the selector returns.</typeparam>
        /// <param name = "source">The source for this extension method.</param>
        /// <param name = "selector">A function which given the source object, returns a selected value.</param>
        /// <returns>The selected value when source is not null; null otherwise.</returns>
        public static TInner IfNotNull<T, TInner>(this T source, Func<T, TInner> selector) where T : class
        {
            return source != null ? selector(source) : default(TInner);
        }

        /// <summary>
        ///     Return the index of the first matching item or -1.
        /// </summary>
        /// <typeparam name = "T"></typeparam>
        /// <param name = "list">The list.</param>
        /// <param name = "comparison">The comparison.</param>
        /// <returns>The item index</returns>
        public static int IndexOf<T>(this IList<T> list, Func<T, bool> comparison)
        {
            for (var i = 0; i < list.Count; i++)
            {
                if (comparison(list[i]))
                {
                    return i;
                }
            }
            return -1;
        }

        /// <summary>
        /// Determines whether two sequences are equivalent (optionally to the end of the shortest one).
        /// </summary>
        /// <typeparam name="T">The type of the items in the sequence.</typeparam>
        /// <param name="first">The first sequence.</param>
        /// <param name="second">The second sequence.</param>
        /// <param name="useShortestSequenceLength">Specifies whether the equivalence test should only proceed up to the length of the shortest sequence.</param>
        /// <returns>
        ///   <c>true</c> if the the two sequences are equivalent; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsEquivalentTo<T>(this IEnumerable<T> first, IEnumerable<T> second, bool useShortestSequenceLength = false)
        {
            if (first == null)
            {
                return second == null;
            }
            if (second == null)
            {
                return false;
            }

            var fe = first.GetEnumerator();
            var se = second.GetEnumerator();

            while (fe.MoveNext())
            {
                if (!se.MoveNext())
                {
                    return useShortestSequenceLength;
                }

                if (!Equals(fe.Current, se.Current))
                {
                    return false;
                }
            }

            // if we are to use the shortest length, then we return true, because they were the same all the way through based on fe's length
            // if, instead, we have to have the same length, then if we can move one more time with se, then we don't have the same length and so must return false
            return useShortestSequenceLength || !se.MoveNext();
        }

        /// <summary>
        /// Determines whether two read-only diectionaries are equivalent (have the same keys, and for each matched key, the same value).
        /// </summary>
        /// <typeparam name="TKey">The type of the keys.</typeparam>
        /// <typeparam name="TValue">The type of the items in the dictionary.</typeparam>
        /// <param name="first">The first dictionary.</param>
        /// <param name="second">The second dictionary.</param>
        /// <returns>
        ///   <c>true</c> if the the two dictionaries are equivalent; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsEquivalentTo<TKey, TValue>(this IReadOnlyDictionary<TKey, TValue> first, IReadOnlyDictionary<TKey, TValue> second)
        {
            if (first == null)
            {
                return second == null;
            }
            if (second == null)
            {
                return false;
            }

            foreach (var f in first)
            {
                TValue secondValue;
                if (!second.TryGetValue(f.Key, out secondValue))
                {
                    return false;
                }
                if (!Equals(f.Value, secondValue))
                {
                    return false;
                }
            }

            return true;
        }

        /// <summary>
        /// Determines whether two arrays are equivalent from their given starting offsets, optionally considering only the number of items of the shortest sub-array.
        /// </summary>
        /// <typeparam name="T">The type of the items in the sequence.</typeparam>
        /// <param name="first">The first array to compare.</param>
        /// <param name="second">The second array to compare.</param>
        /// <param name="firstOffset">The offset in the first array from which to begin comparison.</param>
        /// <param name="secondOffset">The offset in the second array from which to begin comparison.</param>
        /// <param name="useShortestArrayLength">Specifies whether the equivalence test should only proceed up to the length of the shortest sequence.</param>
        /// <returns>
        ///   <c>true</c> if the the two (sub)arrays are equivalent; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsEquivalentTo<T>(this T[] first, T[] second, int firstOffset = 0, int secondOffset = 0, bool useShortestArrayLength = false)
        {
            if (first == null)
            {
                return second == null;
            }
            if (second == null)
            {
                return false;
            }

            var lengthEqual = first.Length - firstOffset == second.Length - secondOffset;
            if (!useShortestArrayLength && !lengthEqual)
            {
                return false;
            }

            for (int i = firstOffset, j = secondOffset; i < first.Length && j < second.Length; i++, j++)
            {
                if (!Equals(first[i], second[j]))
                {
                    return false;
                }
            }

            return true;
        }

        //public static bool IsNotNullOrEmpty(this IEnumerable source)
        //{
        //    return source != null && source.Any();
        //}

        /// <summary>
        /// Validates that the <paramref name="source"/> is not null and contains items.
        /// </summary>
        public static bool IsNotNullOrEmpty<TSource>(this IEnumerable<TSource> source)
        {
            return source != null && source.Any();
        }

        public static bool IsNullOrEmpty<T>(this IEnumerable<T> enumerable)
        {
            return enumerable == null || !enumerable.Any();
        }

        public static TU MaxOrDefault<T, TU>(this IEnumerable<T> enumerable, Func<T, TU> selector, TU defaultValueIfNoItemsInSequence = default(TU))
        {
            return !enumerable.Any() ? defaultValueIfNoItemsInSequence : enumerable.Max(selector);
        }

        public static bool None<TSource>(this IEnumerable<TSource> source)
        {
            return !source.Any();
        }

        public static bool None<TSource>(this IEnumerable<TSource> source, Func<TSource, bool> predicate)
        {
            return !source.Any(predicate);
        }

        /// <summary>
        /// Like LINQ's <see cref="Enumerable.All{T}"/> but returns <see langword="false"/> if there are no items instead of
        /// <see langword="true"/>.
        /// </summary>
        /// <typeparam name="T">The type of items in the sequence.</typeparam>
        /// <param name="sequence">The sequences to check.</param>
        /// <param name="predicate">The predicate to determine allness.</param>
        /// <returns></returns>
        public static bool NonEmptyAll<T>(this IEnumerable<T> sequence, Func<T, bool> predicate)
        {
            return sequence.Any() && sequence.All(predicate);
        }

        public static IEnumerable<TIn> NullOrEmptyCoalescing<TIn>(this IEnumerable<TIn> subject, Func<IEnumerable<TIn>> result)
        {
            return subject == null || !subject.Any() ? result() : subject;
        }

        public static IEnumerable<T> NullSafe<T>(this IEnumerable<T> source)
        {
            return source ?? Enumerable.Empty<T>();
        }

        /// <summary>
        /// Prepends individual items to a sequence.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sequence"></param>
        /// <param name="otherStuff"></param>
        /// <returns></returns>
        public static IEnumerable<T> Prepend<T>(this IEnumerable<T> sequence, params T[] otherStuff)
        {
            foreach (var v in otherStuff)
            {
                yield return v;
            }

            foreach (var v in sequence)
            {
                yield return v;
            }
        }

        /// <summary>
        /// Remove item from a list
        /// </summary>
        /// <param name = "source"></param>
        /// <param name = "predicate"></param>
        /// <typeparam name = "T"></typeparam>
        /// <returns></returns>
        /// <remarks>
        ///     Contributed by Michael T, http://about.me/MichaelTran
        /// </remarks>
        public static IEnumerable<T> RemoveAll<T>(this IEnumerable<T> source, Predicate<T> predicate)
        {
            if (source == null)
            {
                return Enumerable.Empty<T>();
            }

            var list = source.ToList();
            list.RemoveAll(predicate);
            return list;
        }

        /// <summary>
        ///     Creates a string from the sequence by concatenating the result
        ///     of the specified string selector function for each element.
        /// </summary>
        /// <param name="separator">The string which separates each concatenated item.</param>
        /// <param name="source">Enumerable to concatenate</param>
        /// <param name="stringSelector">ToString projector</param>
        public static string ToConcatenatedString<T>(
            this IEnumerable<T> source,
            Func<T, string> stringSelector,
            string separator)
        {
            var b = new StringBuilder();
            var needsSeparator = false; // don't use for first item

            foreach (var item in source)
            {
                if (needsSeparator)
                {
                    b.Append(separator);
                }

                b.Append(stringSelector(item));
                needsSeparator = true;
            }

            return b.ToString();
        }

        public static IDictionary<TKey, TValue> ToDictionary<TKey, TValue>(this IEnumerable<KeyValuePair<TKey, TValue>> keyValuePairs)
        {
            return keyValuePairs.ToDictionary(keyValuePair => keyValuePair.Key, keyValuePair => keyValuePair.Value);
        }

        public static IList<T> ToListNullSafe<T>(this IEnumerable<T> source)
        {
            return source?.ToList() ?? new List<T>();
        }

        public static IReadOnlyCollection<T> ToReadOnlyCollection<T>(this IEnumerable<T> source)
        {
            var roc = source as IReadOnlyCollection<T>;
            return roc ?? source.ToList().AsReadOnly();
        }

        public static IReadOnlyDictionary<TKey, TValue> ToReadOnlyDictionary<TKey, TValue>(this IEnumerable<KeyValuePair<TKey, TValue>> keyValuePairs)
        {
            return new System.Collections.ObjectModel.ReadOnlyDictionary<TKey, TValue>(keyValuePairs.ToDictionary());
        }
    }
}