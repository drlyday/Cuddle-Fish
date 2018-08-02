using System;
using System.Diagnostics;
using System.IO;

namespace CuddleFishConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Start CuddleFish!");
            var currentDirectory = AppDomain.CurrentDomain.BaseDirectory;

            var psiNpmRunDist = new ProcessStartInfo
            {
               FileName = "cmd",
               RedirectStandardInput = true,
               WorkingDirectory = Path.Combine(currentDirectory, "..\\..\\..\\..\\AngularClient")
            };
            var pNpmRunDist = Process.Start(psiNpmRunDist);
            //pNpmRunDist.StandardInput.WriteLine("npm run dist & exit");
            pNpmRunDist.StandardInput.WriteLine("npm start");
            pNpmRunDist.WaitForExit();
        }
    }
}
