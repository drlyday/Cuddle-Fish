using System;
using Autofac;
using MovieStore.Messages;

namespace MovieStore.Handlers
{
    public interface IMessageHandler
    {
        void Handle(IMessage message);
    }

    public abstract class MessageHandler<T> : IMessageHandler where T : IMessage
    {
        public void Handle(IMessage message)
        {
            Console.WriteLine($"MessageDispatcher<> Received {message.Name}.");
            InnerHandle((T)message);
        }

        protected abstract void InnerHandle(T message);
    }

    public class DynamicHandler : IMessageHandler
    {
        ILifetimeScope _injector;
        public DynamicHandler(ILifetimeScope injector)
        {
            _injector = injector;
        }

        public void Handle(IMessage message)
        {
            Console.WriteLine($"{nameof(DynamicHandler)} Dynamically handling: {message.Name}.");
            using (var scope = _injector.BeginLifetimeScope())
            {
                // Get the message and create a TYPE which matches a possible Handler
                Type handlerType = typeof(MessageHandler<>).MakeGenericType(message.GetType());// Creates IMessageHandler<FooMessage>
                                                                                               // WTF: Create a generic type and insert the Type from the message...on the fly. fuckin cool shit
                                                                                               // typeof(IMessageHandler<>) //creates IMessageHandler[T]
                                                                                               // DisplayTypeInfo(typeof(IMessageHandler<>));
                                                                                               // DisplayTypeInfo(handlerType);

                // Ask the container if it has a handler registered as your cool handlerType
                var handler = scope.Resolve(handlerType) as IMessageHandler;
                // WTF: scope.Resolve(handlerType) //creates FooMessageHandler
                // scope.Resolve(handlerType) as IMessageHandler; // cast so you can call the Handle(message)
                // DisplayTypeInfo(handler.GetType());

                handler.Handle(message);
            }
        }

        private static void DisplayTypeInfo(Type t)
        {
            Console.WriteLine("\r\n-----DISPLAY TYPE INFO: \r\n{0}", t);

            Console.WriteLine("\tIs this a generic type definition? {0}", t.IsGenericTypeDefinition);

            Console.WriteLine("\tIs it a generic type? {0}", t.IsGenericType);

            Type[] typeArguments = t.GetGenericArguments();
            Console.WriteLine("\tList type arguments ({0}):", typeArguments.Length);
            foreach (Type tParam in typeArguments)
            {
                Console.WriteLine("\t\t{0}", tParam);
            }
            Console.WriteLine("-----\r\n");
        }
    }
}
