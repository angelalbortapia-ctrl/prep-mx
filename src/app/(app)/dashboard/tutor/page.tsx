'use client';

import { useState } from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const demoQuestions = [
  { id: '1', text: 'Estequiometría — reactivo #42', materia: 'Química' },
  { id: '2', text: 'Ecuación cuadrática — reactivo #8', materia: 'Matemáticas' },
  { id: '3', text: 'Ley de Newton — reactivo #15', materia: 'Física' },
];

export default function TutorPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [response, setResponse] = useState('');

  function askTutor(questionId: string) {
    setSelected(questionId);
    setResponse(
      'El tutor IA explicará aquí por qué fallaste y cómo resolver el ejercicio. ' +
        'En producción solo enviamos el ID de la pregunta al backend — nunca texto libre del alumno (seguridad SRS).'
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Bot className="h-7 w-7 text-primary" />
          Tutor IA 24/7
        </h1>
        <p className="mt-1 text-muted-foreground">
          Pide explicación sobre preguntas que fallaste en simulacros recientes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Preguntas recientes con error</CardTitle>
          <CardDescription>Selecciona una para recibir explicación personalizada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {demoQuestions.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => askTutor(q.id)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors hover:bg-muted ${
                selected === q.id ? 'border-primary bg-primary/5' : ''
              }`}
            >
              <span>{q.text}</span>
              <Badge variant="secondary">{q.materia}</Badge>
            </button>
          ))}
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Explicación del tutor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{response}</p>
            <Button className="mt-4 h-11 rounded-xl" variant="outline">
              Ver ejercicio de práctica similar
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
