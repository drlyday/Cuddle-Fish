using System;
using Autofac;
using MovieStore.Messages;

namespace MovieStore.Handlers
{
  public interface IMessageHandler
  {
    void Handle(IMessage message);
  }

  public interface IMessageHandlerReplier
  {
    TR Handle<TR>(IMessage message);
  }

  public abstract class MessageHandler<T> : IMessageHandler where T : IMessage
  {
    public void Handle(IMessage message)
    {
      throw new NotImplementedException();
    }

    protected abstract void InnerHandle(T message);
  }

  public abstract class MessageHandlerReplier<T> : IMessageHandlerReplier where T : IMessage
  {
    public TR Handle<TR>(IMessage message)
    {
      Console.WriteLine($"MessageDispatcher<> Received {message.Name}.");
      InnerHandle<TR>((T)message);
    }

    protected abstract TR InnerHandle<TR>(T message);

  }

  public class DynamicHandler : IMessageHandler
  {
    readonly ILifetimeScope _injector;
    public DynamicHandler(ILifetimeScope injector)
    {
      _injector = injector;
    }

    public void Handle(IMessage message)
    {
      Console.WriteLine($"{nameof(DynamicHandler)} Dynamically handling: {message.Name}.");
      using (var scope = _injector.BeginLifetimeScope())
      {
        Type handlerType = typeof(MessageHandler<>).MakeGenericType(message.GetType());

        // Ask the container if it has a handler registered as your cool handlerType
        var handler = scope.Resolve(handlerType) as IMessageHandler;
        DisplayTypeInfo(handler?.GetType());

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

  public class DynamicHandlerReplier : IMessageHandlerReplier
  {
    ILifetimeScope _injector;
    public DynamicHandlerReplier(ILifetimeScope injector)
    {
      _injector = injector;
    }

    public T Handle<T>(IMessage message)
    {
      Console.WriteLine($"{nameof(DynamicHandler)} Dynamically handling: {message.Name}.");
      using (var scope = _injector.BeginLifetimeScope())
      {
        Type handlerType = typeof(MessageHandlerReplier<>).MakeGenericType(message.GetType());
        var handler = scope.Resolve(handlerType) as IMessageHandlerReplier;

        return handler.Handle<T>(message);
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